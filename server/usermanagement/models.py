from django.db import models
from django.contrib.auth.hashers import make_password, check_password

# Create your models here.
class MasterUserType(models.Model):
    usertype = models.CharField(max_length=50, unique=True)
    is_enable = models.BooleanField(default=True)

    def __str__(self):
        return self.usertype
    

class UserCategory(models.Model):
    category = models.CharField(max_length=50, unique=True)
    is_enable = models.BooleanField(default=True)

    def __str__(self):
        return self.category



class User(models.Model):
    username = models.CharField(max_length=30, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)  # hashed
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    usertype = models.ForeignKey(MasterUserType,default=1, on_delete=models.CASCADE)
    category = models.ForeignKey(UserCategory, default=1, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    registered_on = models.DateTimeField(auto_now_add=True)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.username