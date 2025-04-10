from rest_framework.serializers import ModelSerializer
from .models import Employee

class EmployeeSerializer(ModelSerializer):
    class Meta:
        model = Employee
        fields=['id','first_name','last_name','email','department','position','salary','date_hired','phone_number','created_by']
        read_only_fields=['created_by','date_hired','id']
    
    def create(self,validated_data):
        user=self.context['request'].user
        employee=Employee.objects.create(created_by = user,**validated_data)
        return employee
    