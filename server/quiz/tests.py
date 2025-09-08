from django.test import TestCase
from usermanagement.models import User, MasterUserType
from quiz.models import MasterCategory, Question, Option, ExamJourney, ExamResult


class MasterCategoryModelTest(TestCase):
    def test_create_category(self):
        category = MasterCategory.objects.create(title="Science")
        self.assertEqual(category.title, "Science")


class QuestionModelTest(TestCase):
    def setUp(self):
        self.category = MasterCategory.objects.create(title="Math")

    def test_create_question(self):
        question = Question.objects.create(
            category=self.category,
            question_txt="What is 2+2?",
            isEnabled=True
        )
        self.assertEqual(question.question_txt, "What is 2+2?")
        self.assertTrue(question.isEnabled)


class OptionModelTest(TestCase):
    def setUp(self):
        self.category = MasterCategory.objects.create(title="Math")
        self.question = Question.objects.create(
            category=self.category,
            question_txt="What is 5+5?",
            isEnabled=True
        )

    def test_create_option(self):
        option = Option.objects.create(
            question=self.question,
            option_text="10",
            is_correct=True,
            isEnabled=True
        )
        self.assertEqual(option.option_text, "10")
        self.assertTrue(option.is_correct)


class ExamJourneyModelTest(TestCase):
    def setUp(self):
        # 👇 use correct field (title, not name)
        self.usertype = MasterUserType.objects.create(title="Student")
        self.user = User.objects.create(username="testuser", usertype=self.usertype)
        self.user.set_password("pass123")
        self.user.save()

        self.category = MasterCategory.objects.create(title="History")

    def test_create_exam_journey(self):
        journey = ExamJourney.objects.create(user=self.user, category=self.category)
        self.assertEqual(journey.user.username, "testuser")
        self.assertEqual(journey.category.title, "History")


class ExamResultModelTest(TestCase):
    def setUp(self):
        self.usertype = MasterUserType.objects.create(title="Student")
        self.user = User.objects.create(username="testuser", usertype=self.usertype)
        self.user.set_password("pass123")
        self.user.save()

        self.category = MasterCategory.objects.create(title="Geography")
        self.journey = ExamJourney.objects.create(user=self.user, category=self.category)

    def test_create_exam_result(self):
        result = ExamResult.objects.create(
            exam_journey=self.journey,
            score=85
        )
        self.assertEqual(result.exam_journey, self.journey)
        self.assertEqual(result.score, 85)
