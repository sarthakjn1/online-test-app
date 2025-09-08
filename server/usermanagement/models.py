from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class UserManager(models.Manager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not username:
            raise ValueError("The Username must be set")
        if not email:
            raise ValueError("The Email must be set")

        user = self.model(
            username=username,
            email=email,
            password=make_password(password),  # hash password
            **extra_fields
        )
        user.save(using=self._db)
        return user

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
    objects = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

    @property
    def is_anonymous(self):
        return False

    @property
    def is_authenticated(self):
        return True


    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.username