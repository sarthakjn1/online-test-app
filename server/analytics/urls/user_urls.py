from django.urls import path
from analytics.views.user_views import user_progress_view, user_avg_score_view, score_distribution_view, daily_quiz_trends_view

urlpatterns = [
    path("progress/<int:user_id>/", user_progress_view),
    path("avg/", user_avg_score_view),
    path('score-distribution/', score_distribution_view, name='score-distribution'),
    path('daily-trends/', daily_quiz_trends_view, name='daily-trends')
]
