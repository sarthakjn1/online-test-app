from rest_framework import serializers
from .models import MasterCategory, Question, Option


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