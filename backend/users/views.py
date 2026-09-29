from rest_framework import status, permissions
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import StudentProfile, CompanyProfile
from .serializers import (
    RegisterSerializer, LoginSerializer, UserSerializer,
    StudentProfileSerializer, CompanyProfileSerializer
)

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "token": token.key,
            "user": UserSerializer(user).data,
        }, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "token": token.key,
            "user": UserSerializer(user).data,
        })

class MeView(APIView):
    def get(self, request):
        return Response(UserSerializer(request.user).data)

class StudentProfileView(APIView):
    def get(self, request):
        if request.user.role != "student":
            return Response({"detail": "Student access required."}, status=403)
        return Response(StudentProfileSerializer(request.user.student_profile).data)

    def put(self, request):
        if request.user.role != "student":
            return Response({"detail": "Student access required."}, status=403)
        serializer = StudentProfileSerializer(
            request.user.student_profile,
            data=request.data,
            partial=True,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class CompanyProfileView(APIView):
    def get(self, request):
        if request.user.role != "company":
            return Response({"detail": "Company access required."}, status=403)
        return Response(CompanyProfileSerializer(request.user.company_profile).data)

    def put(self, request):
        if request.user.role != "company":
            return Response({"detail": "Company access required."}, status=403)
        serializer = CompanyProfileSerializer(
            request.user.company_profile,
            data=request.data,
            partial=True,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
