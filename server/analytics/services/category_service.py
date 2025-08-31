from quiz.models import ExamResult, MasterCategory, Question, Option
from django.db.models import Avg, Count

def get_category_performance():
    """
    Returns average score and attempt count per category.
    """
    results = ExamResult.objects.values(
        "category_id"
    ).annotate(
        avg_score=Avg("score"),
        attempts=Count("id")
    )

    # Attach category names
    data = []
    for r in results:
        cat = MasterCategory.objects.get(id=r["category_id"])
        data.append({
            "category_id": r["category_id"],
            "category_name": cat.name,
            "avg_score": r["avg_score"],
            "attempts": r["attempts"]
        })
    return data


def get_question_difficulty(category_id):
    """
    Returns % correct per question in a category.
    """
    questions = Question.objects.filter(category_id=category_id)
    data = []

    for q in questions:
        total_attempts = q.option_set.count()
        correct_attempts = q.option_set.filter(isCorrect=True).count()

        data.append({
            "question_id": q.id,
            "text": q.text,
            "correct_rate": (
                (correct_attempts / total_attempts) * 100
                if total_attempts > 0 else 0
            )
        })
    return data
