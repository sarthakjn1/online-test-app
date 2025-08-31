from quiz.models import ExamResult
from usermanagement.models import User
from django.db.models import Avg
from django.db.models import Avg, Count, F, ExpressionWrapper, FloatField
from decimal import Decimal, ROUND_HALF_UP

def get_user_progress(user_id):
    """
    Returns user scores over time.
    """
    return ExamResult.objects.filter(user=user_id).order_by("id").values(
        "id", "score", "total_marks", "created_on"
    )




def get_user_avg_score():
    """
    Returns average percentage score for a user.
    """
    results = ExamResult.objects.values("user").annotate(
        attempts = Count("id"),
        avg_score=Avg(
            ExpressionWrapper(
                (F("score") * 100.0) / F("total_marks"),
                output_field=FloatField()
            )
        )
    )

    data = []
    for r in results:
        avg_score = (
            Decimal(str(r["avg_score"]))  # convert to Decimal for precise rounding
            .quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
            if r["avg_score"] is not None else None
        )
        user = User.objects.get(id=r["user"])
        data.append({
            "user": user.username,
            "avg_score" : float(avg_score) if avg_score is not None else None,
            "attempts": r["attempts"]
        })
    return data

    

