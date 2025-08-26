from django.db import models
from django.utils import timezone


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
