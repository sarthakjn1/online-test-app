from django.contrib import admin
from .models import MasterCategory, Question, Option
# Register your models here.


admin.site.register(MasterCategory)
admin.site.register(Question)
admin.site.register(Option)