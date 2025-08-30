from rest_framework import serializers
from .models import MasterCategory, Question, Option, ExamJourney, ExamResult


class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'option_text', 'isEnabled', 'is_correct', 'created_on']


class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, read_only=True)  # nested options

    class Meta:
        model = Question
        fields = ['id', 'category', 'question_txt', 'isEnabled', 'created_on', 'options']


class MasterCategorySerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)  # nested questions

    class Meta:
        model = MasterCategory
        fields = [
            'id', 'title', 'description', 'totalPublishedQuestions',
            'totalTime', 'isEnabled', 'registered_on', 'updated_on', 'questions'
        ]


class MasterCategoryGetSerializer(serializers.ModelSerializer):

    class Meta:
        model = MasterCategory
        fields = [
            'id', 'title', 'description', 'totalPublishedQuestions',
            'totalTime'
        ]


class ExamJourneySerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamJourney
        fields = ["id", "user", "user_journey", "created_on", "updated_on"]


class ExamResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamResult
        fields = ["id", "exam", "user", "total_marks", "score", "total_time", "created_on"]