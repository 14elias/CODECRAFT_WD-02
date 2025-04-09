from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from .models import Employee
from .serializers import EmployeeSerializer

class EmployeeView(APIView):
    permission_classes=[IsAuthenticated,IsAdminUser]
    def post(self,request):
        serializer = EmployeeSerializer(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        serializer.save
        return Response(serializer.data)
    def get(self,request):
        employee = Employee.objects.all()
        serializer = EmployeeSerializer(employee,many=True)
        return Response(serializer.data)

class EmployeeSpecificView(APIView):
    def get(self,request,*args,**kwargs):
        employee=Employee.objects.get(id=self.kwargs['pk'])
        serializer=EmployeeSerializer(employee,many=False)
        return Response(serializer.data)
    
    def patch(self,request,*args,**kwargs):
        employee=Employee.objects.get(id=self.kwargs['pk'])
        serializer=EmployeeSerializer(employee,data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def delete(self,request,*args,**kwargs):
        employee = Employee.objects.get(id=self.kwargs['pk'])
        employee.delete()
        return Response({'message':"deleted successfully"},status= status.HTTP_204_NO_CONTENT)