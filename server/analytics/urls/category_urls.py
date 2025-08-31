from django.urls import path
from analytics.views.category_views import category_performance_view, question_difficulty_view

urlpatterns = [
    path("performance/", category_performance_view),
    path("difficulty/<int:category_id>/", question_difficulty_view),
]
