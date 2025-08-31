from rest_framework.response import Response
from rest_framework.decorators import api_view
from analytics.services.category_service import get_category_performance, get_question_difficulty
from analytics.serializers.category_serializers import CategoryPerformanceSerializer, QuestionDifficultySerializer

@api_view(["GET"])
def category_performance_view(request):
    data = get_category_performance()
    serializer = CategoryPerformanceSerializer(data, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def question_difficulty_view(request, category_id):
    data = get_question_difficulty(category_id)
    serializer = QuestionDifficultySerializer(data, many=True)
    return Response(serializer.data)
