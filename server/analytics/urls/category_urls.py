from django.urls import path
from analytics.views.category_views import category_performance_view

urlpatterns = [
    path("performance/", category_performance_view),
]
