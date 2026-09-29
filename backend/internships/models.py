from django.db import models
from django.conf import settings

class Internship(models.Model):
    WORK_MODES = (
        ("Online", "Online"),
        ("Offline", "Offline"),
        ("Hybrid", "Hybrid"),
    )
    company = models.ForeignKey(
        "users.CompanyProfile",
        on_delete=models.CASCADE,
        related_name="internships",
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    skills = models.CharField(max_length=500)
    location = models.CharField(max_length=150)
    work_mode = models.CharField(max_length=20, choices=WORK_MODES)
    duration = models.CharField(max_length=100)
    stipend = models.CharField(max_length=100)
    openings = models.PositiveIntegerField(default=1)
    deadline = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Application(models.Model):
    STATUS_CHOICES = (
        ("Applied", "Applied"),
        ("Shortlisted", "Shortlisted"),
        ("Interview", "Interview"),
        ("Selected", "Selected"),
        ("Rejected", "Rejected"),
    )
    student = models.ForeignKey(
        "users.StudentProfile",
        on_delete=models.CASCADE,
        related_name="applications",
    )
    internship = models.ForeignKey(
        Internship,
        on_delete=models.CASCADE,
        related_name="applications",
    )
    applied_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Applied")

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["student", "internship"],
                name="unique_student_internship_application",
            )
        ]

    def __str__(self):
        return f"{self.student} - {self.internship}"
