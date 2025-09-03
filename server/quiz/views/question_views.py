from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import random
from ..models import Question, MasterCategory
from ..serializers import QuestionSerializer, BulkQuestionCreateSerializer

@api_view(["POST"])
def add_question(request):
    data = request.data
    many = isinstance(data, list)  # support bulk insert
    serializer = QuestionSerializer(data=data, many=many)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["PUT"])
def update_question(request, pk):
    try:
        question = Question.objects.get(pk=pk)
    except Question.DoesNotExist:
        return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = QuestionSerializer(question, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["DELETE"])
def delete_question(request, pk):
    try:
        question = Question.objects.get(pk=pk)
        question.delete()
        return Response({"message": "Deleted"}, status=status.HTTP_200_OK)
    except Question.DoesNotExist:
        return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)
    


@api_view(["GET"])
def get_category_questions(request, category_id):
    try:
        # Fetch category
        category = MasterCategory.objects.get(id=category_id, isEnabled=True)

    except MasterCategory.DoesNotExist:
        return Response(
            {"error": "Category not found"},
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Get all enabled questions for the category
    questions = list(category.questions.filter(isEnabled=True))

    if not questions:
        return Response(
            {"error": "No questions available for this category"},
            status=status.HTTP_404_NOT_FOUND
        )

    # Randomly sample questions up to the published limit
    num_questions = min(len(questions), category.totalPublishedQuestions)
    selected_questions = random.sample(questions, num_questions)

    if not questions:
        return Response(
            {"error": "No questions available for this category"},
            status=status.HTTP_404_NOT_FOUND
        )

    # Randomly sample questions up to the published limit
    num_questions = min(len(questions), category.totalPublishedQuestions)
    selected_questions = random.sample(questions, num_questions)

    # Build response
    data = []
    for q in selected_questions:
        options = q.options.filter(isEnabled=True)
        options_data = [
            {
                "id": opt.id,
                "option_text": opt.option_text,
                "isCorrect": opt.is_correct  # flag correct answer
            }
            for opt in options
        ]
        data.append({
            "id": q.id,
            "question_txt": q.question_txt,
            "options": options_data,
        })

        response_data = {
        "category_id": category.id,
        "category_title": category.title,
        "totalTime": category.totalTime, 
        "totalQuestions": num_questions,
        "questions": data
    }

    return Response(response_data, status=status.HTTP_200_OK)


@api_view(["POST"])
def bulk_add_questions(request):
    serializer = BulkQuestionCreateSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Questions added successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




    

