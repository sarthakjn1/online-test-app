from quiz.models import ExamResult
from usermanagement.models import User
from django.db.models import Avg, FloatField,ExpressionWrapper, F, Count
from django.utils.timezone import now, timedelta

def get_total_quizzes():
    return ExamResult.objects.count()

def get_active_users_last_7_days():
    week_ago = now() - timedelta(days=7)
    return ExamResult.objects.filter(created_on__gte=week_ago).values("user_id").distinct().count()

def get_avg_score():
    avg_score = ExamResult.objects.annotate(
        percentage=ExpressionWrapper(
            (F('score') * 100.0) / F('total_marks'),
            output_field=FloatField()
        )
    ).aggregate(Avg('percentage'))['percentage__avg'] or 0

    return avg_score