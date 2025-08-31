from rest_framework import serializers

class CategoryPerformanceSerializer(serializers.Serializer):
    category_id = serializers.IntegerField()
    category_name = serializers.CharField()
    avg_score = serializers.FloatField()
    attempts = serializers.IntegerField()

class QuestionDifficultySerializer(serializers.Serializer):
    question_id = serializers.IntegerField()
    text = serializers.CharField()
    correct_rate = serializers.FloatField()
