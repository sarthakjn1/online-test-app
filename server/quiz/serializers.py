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
    
    
class DisplayOptionSerializer(serializers.ModelSerializer):
    selected_option = serializers.SerializerMethodField()

    class Meta:
        model = Option
        fields = ['id', 'option_text', 'is_correct', 'selected_option']

    def get_selected_option(self, obj):
        """
        Dynamically mark if this option was selected by the user.
        """
        # context is passed from the view with selected_option_id
        selected_option_id = self.context.get('selected_option_id', None)
        return obj.id == selected_option_id
    
class DisplayQuestionSerializer(serializers.ModelSerializer):
    options = serializers.SerializerMethodField()
    time_taken = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ['id', 'question_txt', 'options', 'time_taken']

    def get_options(self, obj):
        """
        Fetch related options and mark selected one.
        """
        selected_option_id = self.context.get('selected_option_map', {}).get(obj.id)
        return DisplayOptionSerializer(
            obj.options.filter(isEnabled=True),
            many=True,
            context={'selected_option_id': selected_option_id}
        ).data

    def get_time_taken(self, obj):
        """
        Fetch time_taken for this question from context mapping.
        """
        return self.context.get('time_taken_map', {}).get(obj.id, 0)  # Default to 0