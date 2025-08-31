from quiz.models import ExamResult
from django.db.models import Count
from django.utils.timezone import now, timedelta

def get_total_quizzes():
    return ExamResult.objects.count()

def get_active_users_last_7_days():
    week_ago = now() - timedelta(days=7)
    return ExamResult.objects.filter(created_on__gte=week_ago).values("user_id").distinct().count()
