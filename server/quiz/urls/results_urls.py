from django.urls import path
from ..views import results_views

urlpatterns = [
    # ExamJourney
    path("exam_journey/", results_views.create_exam_journey, name="create_exam_journey"),
    path("exam_journey/<int:pk>/", results_views.get_exam_journey, name="get_exam_journey"),

    # ExamResult
    path("exam_result/", results_views.create_exam_result, name="create_exam_result"),
    path("exam_result/all/", results_views.get_all_exam_results, name="get_all_exam_results"),
    path("exam_result/<int:exam_id>/", results_views.get_results_by_exam, name="get_results_by_exam"),
]
