from rest_framework import serializers

class UserProgressSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    score = serializers.FloatField()
    total_marks = serializers.FloatField()
    created_at = serializers.DateTimeField()

class UserAvgScoreSerializer(serializers.Serializer):
    avg_score = serializers.FloatField(allow_null=True)
