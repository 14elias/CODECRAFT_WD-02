from django.urls import path
from .views import EmployeeView,EmployeeSpecificView

urlpatterns = [
    path('create/', EmployeeView.as_view()),
    path('create/<int:pk>', EmployeeSpecificView.as_view()),
]
