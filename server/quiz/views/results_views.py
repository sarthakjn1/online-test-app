from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from ..models import ExamJourney, ExamResult, Question, MasterCategory, User
from ..serializers import DisplayQuestionSerializer



# ------------------- Submit Exam -------------------

@api_view(["POST"])
def submit_exam(request):
    user_id = request.data.get("user")
    category_id = request.data.get("category")
    user_journey = request.data.get("user_journey")

    if not user_id or not category_id or not user_journey:
        return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

    # Validate user and category
    user = get_object_or_404(User, id=user_id)
    category = get_object_or_404(MasterCategory, id=category_id)

    total_score = 0
    total_time = 0

    # Save ExamJourney
    exam_journey = ExamJourney.objects.create(user=user, category=category, user_journey=user_journey)

    # Build helper maps
    selected_option_map = {q["question_id"]: q.get("selected_option_id") for q in user_journey}
    time_taken_map = {q["question_id"]: q.get("time_taken", 0) for q in user_journey}


    # Get question objects
    question_ids = [q["question_id"] for q in user_journey]
    questions = Question.objects.filter(id__in=question_ids)

    # Calculate score and total time
    for record in user_journey:
        question_id = record.get("question_id")
        selected_option_id = record.get("selected_option_id")
        time_taken = record.get("time_taken", 0)

        total_time += time_taken
        question = get_object_or_404(Question, id=question_id)
        correct_option = question.options.filter(is_correct=True).first()

        if selected_option_id and correct_option and correct_option.id == selected_option_id:
            total_score += 1

    # Save ExamResult
    ExamResult.objects.create(
        user=user,
        category=category,
        exam=exam_journey,
        score=total_score,
        total_marks=len(user_journey),
        total_time=total_time
    )

    # Serialize with context
    serialized_questions = DisplayQuestionSerializer(
        questions,
        many=True,
        context={
            'selected_option_map': selected_option_map,
            'time_taken_map': time_taken_map
        }
    ).data

    return Response({
        "user": user_journey,
        "exam_id": exam_journey.id,
        "score": total_score,
        "categoryId": category.id,
        "total_marks": len(user_journey),
        "total_time": total_time,
        "quizData": {
            "category_title": category.title,
            "questions": serialized_questions
        }
    }, status=status.HTTP_201_CREATED)

