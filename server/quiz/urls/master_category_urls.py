from django.urls import path
from ..views import master_category_views as views

urlpatterns = [
    path("add/", views.add_master_category, name="add_master_category"),
    path("update/<int:pk>/", views.update_master_category, name="update_master_category"),
    path("delete/<int:pk>/", views.delete_master_category, name="delete_master_category"),
]
