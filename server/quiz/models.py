from django.db import models
from django.utils import timezone
from usermanagement.models import User


class MasterCategory(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    totalPublishedQuestions = models.IntegerField(default=0)
    totalTime = models.IntegerField(help_text="Total time in minutes", default=0)
    isEnabled = models.BooleanField(default=True)
    registered_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Question(models.Model):
    category = models.ForeignKey(
        MasterCategory,
        on_delete=models.CASCADE,
        related_name="questions"
    )
    question_txt = models.TextField()
    isEnabled = models.BooleanField(default=True)
    created_on = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.question_txt[:50]  # First 50 chars


class Option(models.Model):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="options"
    )
    option_text = models.CharField(max_length=255)
    isEnabled = models.BooleanField(default=True)
    is_correct = models.BooleanField(default=False)  # ✅ marks the correct answer
    created_on = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.option_text
    

class ExamJourney(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="exam_journeys")
    user_journey = models.JSONField()
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"ExamJourney {self.id} for {self.user.username}"

class ExamResult(models.Model):
    exam = models.ForeignKey(ExamJourney, on_delete=models.CASCADE, related_name="results")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="exam_results")
    total_marks = models.IntegerField()
    score = models.IntegerField()
    total_time = models.IntegerField(help_text="Total time taken in seconds")  # or seconds depending on design
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Result of {self.user.username} for Exam {self.exam.id}"