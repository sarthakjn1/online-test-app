from rest_framework.response import Response
from rest_framework.decorators import api_view
from analytics.services.overall_service import get_total_quizzes, get_active_users_last_7_days
from analytics.serializers.overall_serializers import OverallAnalyticsSerializer

@api_view(["GET"])
def overall_analytics_view(request):
    data = {
        "total_quizzes": get_total_quizzes(),
        "active_users_last_7_days": get_active_users_last_7_days()
    }
    serializer = OverallAnalyticsSerializer(data)
    return Response(serializer.data)
