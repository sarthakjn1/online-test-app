# Register your models here.
from django.contrib import admin
from .models import MasterUserType, UserCategory, User

admin.site.register(MasterUserType)
admin.site.register(UserCategory)
admin.site.register(User)
