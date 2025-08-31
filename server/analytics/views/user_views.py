from rest_framework.response import Response
from rest_framework.decorators import api_view
from analytics.services.user_service import get_user_progress, get_user_avg_score
from analytics.serializers.user_serializers import UserProgressSerializer, UserAvgScoreSerializer

@api_view(["GET"])
def user_progress_view(request, user_id):
    data = list(get_user_progress(user_id))
    serializer = UserProgressSerializer(data, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def user_avg_score_view(request, user_id):
    data = get_user_avg_score(user_id)
    serializer = UserAvgScoreSerializer(data)
    return Response(serializer.data)
