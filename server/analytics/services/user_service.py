from quiz.models import ExamResult
from django.db.models import Avg

def get_user_progress(user_id):
    """
    Returns user scores over time.
    """
    return ExamResult.objects.filter(user_id=user_id).order_by("id").values(
        "id", "score", "total_marks", "created_on"
    )


def get_user_avg_score(user_id):
    """
    Returns average score for a user.
    """
    return ExamResult.objects.filter(user_id=user_id).aggregate(
        avg_score=Avg("score")
    )
