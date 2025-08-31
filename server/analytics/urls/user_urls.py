from django.urls import path
from analytics.views.user_views import user_progress_view, user_avg_score_view

urlpatterns = [
    path("progress/<int:user_id>/", user_progress_view),
    path("avg/<int:user_id>/", user_avg_score_view),
]
