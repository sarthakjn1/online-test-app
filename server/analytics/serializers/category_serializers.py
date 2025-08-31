from rest_framework import serializers

class CategoryPerformanceSerializer(serializers.Serializer):
    category_id = serializers.IntegerField()
    category_name = serializers.CharField()
    avg_score = serializers.FloatField()
    attempts = serializers.IntegerField()
