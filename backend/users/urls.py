from django.urls import path
from .views import RegisterView, LoginView, MeView, StudentProfileView, CompanyProfileView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("me/", MeView.as_view()),
    path("student-profile/", StudentProfileView.as_view()),
    path("company-profile/", CompanyProfileView.as_view()),
]
