from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from ..models import ExamJourney, ExamResult
from ..serializers import ExamJourneySerializer, ExamResultSerializer


# ------------------- ExamJourney -------------------

@api_view(["POST"])
def create_exam_journey(request):
    serializer = ExamJourneySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_exam_journey(request, pk):
    try:
        journey = ExamJourney.objects.get(pk=pk)
    except ExamJourney.DoesNotExist:
        return Response({"error": "ExamJourney not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = ExamJourneySerializer(journey)
    return Response(serializer.data)


# ------------------- ExamResult -------------------

@api_view(["POST"])
def create_exam_result(request):
    serializer = ExamResultSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_all_exam_results(request):
    results = ExamResult.objects.all()
    serializer = ExamResultSerializer(results, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def get_results_by_exam(request, exam_id):
    results = ExamResult.objects.filter(exam_id=exam_id)
    if not results.exists():
        return Response({"error": "No results found for this exam"}, status=status.HTTP_404_NOT_FOUND)

    serializer = ExamResultSerializer(results, many=True)
    return Response(serializer.data)
