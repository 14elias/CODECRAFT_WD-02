from django.urls import path
from .views import EmployeeView

urlpatterns = [
    path('create/', EmployeeView.as_view()),
]
