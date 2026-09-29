from datetime import date, timedelta
from django.core.management.base import BaseCommand
from users.models import User, StudentProfile, CompanyProfile
from internships.models import Internship, Application

class Command(BaseCommand):
    help = "Create demo users and internship data."

    def handle(self, *args, **options):
        admin, created = User.objects.get_or_create(
            email="admin@example.com",
            defaults={"username": "admin", "role": "admin", "is_staff": True, "is_superuser": True},
        )
        if created:
            admin.set_password("Admin@123")
            admin.save()

        student, created = User.objects.get_or_create(
            email="student@example.com",
            defaults={"username": "demo_student", "role": "student"},
        )
        if created:
            student.set_password("Student@123")
            student.save()
            StudentProfile.objects.create(
                user=student, college="ABC Engineering College",
                department="Artificial Intelligence and Machine Learning",
                year=3, cgpa=8.4, skills="Python, React, SQL, Django"
            )

        company, created = User.objects.get_or_create(
            email="company@example.com",
            defaults={"username": "demo_company", "role": "company"},
        )
        if created:
            company.set_password("Company@123")
            company.save()
            CompanyProfile.objects.create(
                user=company, company_name="TechNova Solutions",
                email="company@example.com", location="Coimbatore",
                description="Software development company",
                website="https://example.com", approval_status="approved"
            )

        cp = company.company_profile
        sample = [
            ("React JS Intern", "Build responsive React applications.", "React, JavaScript, HTML, CSS", "Coimbatore", "Hybrid", "3 Months", "₹8,000/month"),
            ("Python Django Intern", "Work on REST APIs and Django applications.", "Python, Django, REST API, MySQL", "Chennai", "Online", "4 Months", "₹10,000/month"),
            ("Data Analytics Intern", "Analyze business datasets and create dashboards.", "Python, Pandas, SQL, Power BI", "Bengaluru", "Hybrid", "3 Months", "₹12,000/month"),
        ]
        for title, desc, skills, loc, mode, duration, stipend in sample:
            Internship.objects.get_or_create(
                company=cp, title=title,
                defaults={
                    "description": desc, "skills": skills, "location": loc,
                    "work_mode": mode, "duration": duration, "stipend": stipend,
                    "openings": 3, "deadline": date.today() + timedelta(days=30)
                }
            )

        self.stdout.write(self.style.SUCCESS("Demo data created successfully."))
