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
        fields = ["id", "user", "category","user_journey", "created_on", "updated_on"]


class ExamResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamResult
        fields = ["id", "exam", "user", "category", "total_marks", "score", "total_time", "created_on"]


class QuestionCreateSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True)
    category = serializers.PrimaryKeyRelatedField(queryset=MasterCategory.objects.all())

    class Meta:
        model = Question
        fields = ['id', 'category', 'question_txt', 'isEnabled', 'created_on', 'options']

    def create(self, validated_data):
        options_data = validated_data.pop("options")
        question = Question.objects.create(**validated_data)

        # Ensure exactly one correct answer
        correct_count = sum([1 for opt in options_data if opt.get("is_correct")])
        if correct_count != 1:
            raise serializers.ValidationError("Each question must have exactly one correct option.")

        for option in options_data:
            Option.objects.create(question=question, **option)

        return question
    
class BulkQuestionCreateSerializer(serializers.Serializer):
    questions = QuestionCreateSerializer(many=True)

    def create(self, validated_data):
        questions_data = validated_data.pop("questions")
        created_questions = []

        for q_data in questions_data:
            question = QuestionCreateSerializer().create(q_data)
            created_questions.append(question)

        return created_questions