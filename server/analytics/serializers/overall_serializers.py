from rest_framework import serializers

class OverallAnalyticsSerializer(serializers.Serializer):
    total_quizzes = serializers.IntegerField()
    active_users_last_7_days = serializers.IntegerField()
    avg_score = serializers.FloatField()
