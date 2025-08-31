from quiz.models import ExamResult, MasterCategory, Question, Option
from django.db.models import Avg, Count, F, FloatField, ExpressionWrapper
from decimal import Decimal, ROUND_HALF_UP

def get_category_performance():
    """
    Returns average score and attempt count per category.
    """
    results = (
        ExamResult.objects.values("category")
        .annotate(
            attempts=Count("id"),
            avg_score=Avg(
                ExpressionWrapper(
                    (F("score") * 100.0) / F("total_marks"),
                    output_field=FloatField()
                )
            )
        )
    )

    # Attach category names
    data = []
    for r in results:
        avg_score = (
            Decimal(str(r["avg_score"]))  # convert to Decimal for precise rounding
            .quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
            if r["avg_score"] is not None else None
        )
        cat = MasterCategory.objects.get(id=r["category"])
        data.append({
            "category_id": r["category"],
            "category_name": cat.title,
            "avg_score": float(avg_score) if avg_score is not None else None,
            "attempts": r["attempts"]
        })
    return data


