from django.urls import path
from .views import (
    InternshipListCreateView, InternshipDetailView, ApplyView,
    MyApplicationsView, CompanyApplicationsView, ApplicationStatusView,
    DashboardView, AdminDataView
)

urlpatterns = [
    path("internships/", InternshipListCreateView.as_view()),
    path("internships/<int:pk>/", InternshipDetailView.as_view()),
    path("internships/<int:pk>/apply/", ApplyView.as_view()),
    path("applications/mine/", MyApplicationsView.as_view()),
    path("applications/company/", CompanyApplicationsView.as_view()),
    path("applications/<int:pk>/status/", ApplicationStatusView.as_view()),
    path("dashboard/", DashboardView.as_view()),
    path("admin-data/<str:entity>/", AdminDataView.as_view()),
]
