from django.test import TestCase
from usermanagement.models import User, MasterUserType, UserCategory
from quiz.models import MasterCategory, Question, Option, ExamJourney, ExamResult


class MasterCategoryModelTest(TestCase):
    def test_create_category(self):
        category = MasterCategory.objects.create(title="Science")
        self.assertEqual(category.title, "Science")
        self.assertTrue(category.isEnabled)


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
        # ✅ Create required usertype and category for user
        self.usertype = MasterUserType.objects.create(usertype="Student")
        self.usercategory = UserCategory.objects.create(category="General")

        self.user = User.objects.create(
            username="testuser",
            email="test@example.com",
            first_name="Test",
            last_name="User",
            usertype=self.usertype,
            category=self.usercategory,
        )
        self.user.set_password("pass123")
        self.user.save()

        self.category = MasterCategory.objects.create(title="History")

    def test_create_exam_journey(self):
        journey = ExamJourney.objects.create(
            user=self.user,
            category=self.category,
            user_journey={"Q1": "A"}
        )
        self.assertEqual(journey.user.username, "testuser")
        self.assertEqual(journey.category.title, "History")
        self.assertIn("ExamJourney", str(journey))


class ExamResultModelTest(TestCase):
    def setUp(self):
        self.usertype = MasterUserType.objects.create(usertype="Student")
        self.usercategory = UserCategory.objects.create(category="General")

        self.user = User.objects.create(
            username="student1",
            email="student@example.com",
            first_name="Student",
            last_name="One",
            usertype=self.usertype,
            category=self.usercategory,
        )
        self.user.set_password("pass123")
        self.user.save()

        self.category = MasterCategory.objects.create(title="Geography")
        self.journey = ExamJourney.objects.create(
            user=self.user,
            category=self.category,
            user_journey={"Q1": "B"}
        )

    def test_create_exam_result(self):
        result = ExamResult.objects.create(
            exam=self.journey,
            user=self.user,
            category=self.category,
            total_marks=100,
            score=85,
            total_time=300
        )
        self.assertEqual(result.exam, self.journey)
        self.assertEqual(result.score, 85)
        self.assertEqual(result.total_marks, 100)
        self.assertIn("Result of", str(result))
