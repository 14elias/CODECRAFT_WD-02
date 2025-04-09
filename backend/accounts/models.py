from django.db import models
from django.contrib.auth.models import User,AbstractUser


class Employee(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    date_hired = models.DateField()
    is_active = models.BooleanField(default=True)
    phone_number = models.CharField(max_length = 10)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"