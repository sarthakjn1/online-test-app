from django.urls import path
from analytics.views.overall_views import overall_analytics_view

urlpatterns = [
    path("", overall_analytics_view),
]
