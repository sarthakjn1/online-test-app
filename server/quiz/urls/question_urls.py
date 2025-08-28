from django.urls import path
from ..views import question_views as views

urlpatterns = [
    path("add/", views.add_question, name="add_question"),
    path("update/<int:pk>/", views.update_question, name="update_question"),
    path("delete/<int:pk>/", views.delete_question, name="delete_question"),
    path("by-category/<int:category_id>/",views.get_category_questions,name="get_category_questions"),
]
