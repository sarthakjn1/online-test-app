from django.urls import path
from ..views import results_views

urlpatterns = [
    # ExamJourney
    path("exam_journey/", results_views.submit_exam, name="create_exam_journey")
]
