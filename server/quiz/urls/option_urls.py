from django.urls import path
from ..views import option_views as views

urlpatterns = [
    path("add/", views.add_option, name="add_option"),
    path("update/<int:pk>/", views.update_option, name="update_option"),
    path("delete/<int:pk>/", views.delete_option, name="delete_option"),
]
