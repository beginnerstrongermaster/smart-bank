from django.db import models
from django.contrib.auth.models import AbstractUser
from uuid import uuid4
# Create your models here.

class User(AbstractUser):
    id = models.UUIDField(primary_key=True,default=uuid4)
    phone = models.CharField(max_length=255,unique=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)

