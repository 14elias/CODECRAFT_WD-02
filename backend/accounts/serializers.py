from rest_framework.serializers import ModelSerializer
from .models import Employee

class EmployeeSerializer(ModelSerializer):
    class Meta:
        model = Employee
        fields=['id','first_name','last_name','email','department','position','salary','date_hired','phone_number','created_by']
    
    def create(self,validated_data):
        employee=Employee.objects.create(crated_by = self.context['created_by'],**validated_data)
        employee.save()
        return employee