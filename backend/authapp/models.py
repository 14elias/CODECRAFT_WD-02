from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager

class CustomBaseUserManager(BaseUserManager):

    def create_user(self,email,username,password=None,role='EMPLOYEE',**extrafields):
        if not email:
            raise ValueError ('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, role=role, **extrafields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self,email,username,password=None,**extrafields):
        extrafields.setdefault('is_staff',True)
        extrafields.setdefault('is_superuser',True)
        return self.create_user(email,username,password,role='Admin',**extrafields)
    

class CustomUser(AbstractBaseUser,PermissionsMixin):
    ROLE_CHOICES = (
        ('ADMIN', 'Admin'),
        ('EMPLOYEE', 'Employee'),
    )
    username = models.CharField(max_length=150,unique=True)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=8,choices=ROLE_CHOICES ,default='EMPLOYEE')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomBaseUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS=['email' , 'role']

    def __str__(self):
        return self.username

