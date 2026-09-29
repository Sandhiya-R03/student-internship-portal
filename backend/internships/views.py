from datetime import date
from django.db.models import Count
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Internship, Application
from .serializers import InternshipSerializer, ApplicationSerializer

class InternshipListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        qs = Internship.objects.select_related("company").order_by("-created_at")
        search = request.query_params.get("search", "").strip()
        mode = request.query_params.get("work_mode", "").strip()
        location = request.query_params.get("location", "").strip()

        if search:
            qs = qs.filter(
                title__icontains=search
            ) | Internship.objects.filter(
                skills__icontains=search
            ) | Internship.objects.filter(
                company__company_name__icontains=search
            )
        if mode:
            qs = qs.filter(work_mode=mode)
        if location:
            qs = qs.filter(location__icontains=location)

        return Response(InternshipSerializer(qs.distinct(), many=True).data)

    def post(self, request):
        if request.user.role != "company":
            return Response({"detail": "Only companies can create internships."}, status=403)
        serializer = InternshipSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        internship = serializer.save(company=request.user.company_profile)
        return Response(InternshipSerializer(internship).data, status=201)

class InternshipDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, pk):
        try:
            return Internship.objects.select_related("company").get(pk=pk)
        except Internship.DoesNotExist:
            return None

    def get(self, request, pk):
        obj = self.get_object(pk)
        if not obj:
            return Response({"detail": "Internship not found."}, status=404)
        return Response(InternshipSerializer(obj).data)

    def put(self, request, pk):
        obj = self.get_object(pk)
        if not obj:
            return Response({"detail": "Internship not found."}, status=404)
        if request.user.role != "company" or obj.company.user_id != request.user.id:
            return Response({"detail": "Not allowed."}, status=403)
        serializer = InternshipSerializer(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        obj = self.get_object(pk)
        if not obj:
            return Response({"detail": "Internship not found."}, status=404)
        if request.user.role != "company" or obj.company.user_id != request.user.id:
            return Response({"detail": "Not allowed."}, status=403)
        obj.delete()
        return Response(status=204)

class ApplyView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        if request.user.role != "student":
            return Response({"detail": "Only students can apply."}, status=403)
        try:
            internship = Internship.objects.get(pk=pk)
        except Internship.DoesNotExist:
            return Response({"detail": "Internship not found."}, status=404)

        if internship.deadline < date.today():
            return Response({"detail": "Application deadline has passed."}, status=400)

        application, created = Application.objects.get_or_create(
            student=request.user.student_profile,
            internship=internship,
        )
        if not created:
            return Response({"detail": "You have already applied for this internship."}, status=400)

        return Response(ApplicationSerializer(application).data, status=201)

class MyApplicationsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.role != "student":
            return Response({"detail": "Student access required."}, status=403)
        apps = Application.objects.filter(student=request.user.student_profile).select_related(
            "internship", "internship__company"
        ).order_by("-applied_date")
        return Response(ApplicationSerializer(apps, many=True).data)

class CompanyApplicationsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.role != "company":
            return Response({"detail": "Company access required."}, status=403)
        apps = Application.objects.filter(
            internship__company=request.user.company_profile
        ).select_related("student__user", "internship")
        return Response(ApplicationSerializer(apps, many=True).data)

class ApplicationStatusView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        if request.user.role != "company":
            return Response({"detail": "Company access required."}, status=403)
        try:
            app = Application.objects.select_related("internship").get(pk=pk)
        except Application.DoesNotExist:
            return Response({"detail": "Application not found."}, status=404)
        if app.internship.company.user_id != request.user.id:
            return Response({"detail": "Not allowed."}, status=403)
        new_status = request.data.get("status")
        valid = dict(Application.STATUS_CHOICES)
        if new_status not in valid:
            return Response({"detail": "Invalid status."}, status=400)
        app.status = new_status
        app.save(update_fields=["status"])
        return Response(ApplicationSerializer(app).data)

class DashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.role == "student":
            apps = Application.objects.filter(student=request.user.student_profile)
            return Response({
                "total_applications": apps.count(),
                "shortlisted": apps.filter(status="Shortlisted").count(),
                "interviews": apps.filter(status="Interview").count(),
                "selected": apps.filter(status="Selected").count(),
            })
        if request.user.role == "company":
            internships = Internship.objects.filter(company=request.user.company_profile)
            apps = Application.objects.filter(internship__company=request.user.company_profile)
            return Response({
                "total_internships": internships.count(),
                "active_internships": internships.filter(deadline__gte=date.today()).count(),
                "total_applications": apps.count(),
                "selected": apps.filter(status="Selected").count(),
            })
        return Response({
            "students": __import__("users.models", fromlist=["User"]).User.objects.filter(role="student").count(),
            "companies": __import__("users.models", fromlist=["User"]).User.objects.filter(role="company").count(),
            "internships": Internship.objects.count(),
            "applications": Application.objects.count(),
        })

class AdminDataView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request, entity):
        from users.models import User, StudentProfile, CompanyProfile
        if entity == "students":
            data = User.objects.filter(role="student").values("id", "username", "email")
        elif entity == "companies":
            data = CompanyProfile.objects.all().values(
                "id", "company_name", "email", "location", "approval_status"
            )
        elif entity == "internships":
            data = Internship.objects.select_related("company").values(
                "id", "title", "company__company_name", "location", "work_mode", "deadline"
            )
        elif entity == "applications":
            data = Application.objects.select_related("student__user", "internship").values(
                "id", "student__user__username", "internship__title", "status", "applied_date"
            )
        else:
            return Response({"detail": "Unknown entity."}, status=400)
        return Response(list(data))
