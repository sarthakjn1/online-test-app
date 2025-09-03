from rest_framework.response import Response
from rest_framework.decorators import api_view
from quiz.models import ExamResult
from django.db.models import Count, F, ExpressionWrapper, FloatField
from django.utils.timezone import now
from datetime import timedelta

from analytics.services.user_service import get_user_progress, get_user_avg_score
from analytics.serializers.user_serializers import UserProgressSerializer, UserAvgScoreSerializer

@api_view(["GET"])
def user_progress_view(request, user_id):
    data = list(get_user_progress(user_id))
    serializer = UserProgressSerializer(data, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def user_avg_score_view(request):
    data = get_user_avg_score()
    serializer = UserAvgScoreSerializer(data, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def score_distribution_view(request):
    """
    Returns distribution of quiz scores in percentage buckets
    """
    results = ExamResult.objects.annotate(
        percentage=ExpressionWrapper(
            (F('score') * 100.0) / F('total_marks'),
            output_field=FloatField()
        )
    )

    ranges = {
        "0-50%": results.filter(percentage__lt=50).count(),
        "50-75%": results.filter(percentage__gte=50, percentage__lt=75).count(),
        "75-100%": results.filter(percentage__gte=75).count(),
    }

    return Response(ranges)

@api_view(['GET'])
def daily_quiz_trends_view(request):
    """
    Returns daily quiz attempt counts for the last 7 days
    """
    today = now().date()
    last_week = today - timedelta(days=6)

    data = (
        ExamResult.objects.filter(created_on__date__gte=last_week)
        .values('created_on__date')
        .annotate(attempts=Count('id'))
        .order_by('created_on__date')
    )

    formatted = [
        {"date": str(entry['created_on__date']), "attempts": entry['attempts']}
        for entry in data
    ]

    return Response(formatted)