from rest_framework.response import Response
from rest_framework.decorators import api_view
from analytics.services.category_service import get_category_performance
from analytics.serializers.category_serializers import CategoryPerformanceSerializer

@api_view(["GET"])
def category_performance_view(request):
    data = get_category_performance()
    serializer = CategoryPerformanceSerializer(data, many=True)
    return Response(serializer.data)


