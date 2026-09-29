from rest_framework import serializers
from .models import Internship, Application

class InternshipSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source="company.company_name", read_only=True)
    class Meta:
        model = Internship
        fields = "__all__"
        read_only_fields = ["company", "created_at"]

class ApplicationSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source="student.user.username", read_only=True)
    student_email = serializers.EmailField(source="student.user.email", read_only=True)
    internship_title = serializers.CharField(source="internship.title", read_only=True)
    company_name = serializers.CharField(source="internship.company.company_name", read_only=True)
    resume = serializers.FileField(source="student.resume", read_only=True)
    applied_date = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Application
        fields = [
            "id", "student", "internship", "student_name", "student_email",
            "internship_title", "company_name", "resume", "applied_date", "status"
        ]
        read_only_fields = ["student", "applied_date", "status"]
