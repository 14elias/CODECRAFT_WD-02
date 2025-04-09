from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from .serializers import EmployeeSerializer
from rest_framework.response import Response
from .models import Employee

class EmployeeView(APIView):
    permission_classes=[IsAuthenticated,IsAdminUser]
    def post(self,request):
        serializer = EmployeeSerializer(data=request.data, context={'created_by':request.user})
        serializer.is_valid(raise_exception=True)
        serializer.save
        return Response(serializer.data)
    def get(self,request):
        employee = Employee.objects.all()
        serializer = EmployeeSerializer(employee,many=True)
        return Response(serializer.data)
    
