from django.test import TestCase
from usermanagement.models import User, MasterUserType, UserCategory
from quiz.models import MasterCategory, Question, Option, ExamJourney, ExamResult

class QuizPortalTestCase(TestCase):

    def setUp(self):
        # -------------------------------
        #  Create MasterUserType and UserCategory
        # -------------------------------
        self.usertype = MasterUserType.objects.create(usertype="Student")
        self.usercategory = UserCategory.objects.create(category="General")

        # -------------------------------
        # 2 Create User
        # -------------------------------
        self.user = User.objects.create_user(
            username="john_doe",
            email="john@example.com",
            password="password123",
            first_name="John",
            last_name="Doe",
            usertype=self.usertype,
            category=self.usercategory
        )

        # -------------------------------
        # 3 Create Quiz Category
        # -------------------------------
        self.category = MasterCategory.objects.create(
            title="General Knowledge",
            description="A test category",
            totalPublishedQuestions=2,
            totalTime=10
        )

        # -------------------------------
        # 4 Create Questions & Options
        # -------------------------------
        self.question1 = Question.objects.create(
            category=self.category,
            question_txt="What is the capital of India?"
        )
        self.option1_1 = Option.objects.create(
            question=self.question1, option_text="Delhi", is_correct=True
        )
        self.option1_2 = Option.objects.create(
            question=self.question1, option_text="Mumbai", is_correct=False
        )

        self.question2 = Question.objects.create(
            category=self.category,
            question_txt="Which planet is known as the Red Planet?"
        )
        self.option2_1 = Option.objects.create(
            question=self.question2, option_text="Mars", is_correct=True
        )
        self.option2_2 = Option.objects.create(
            question=self.question2, option_text="Venus", is_correct=False
        )

    # -------------------------------
    # 5 Test ExamJourney Creation
    # -------------------------------
    def test_exam_journey_creation(self):
        journey_data = {
            str(self.question1.id): self.option1_1.id,
            str(self.question2.id): self.option2_2.id  # wrong answer
        }

        exam_journey = ExamJourney.objects.create(
            user=self.user,
            category=self.category,
            user_journey=journey_data
        )

        self.assertEqual(exam_journey.user.username, "john_doe")
        self.assertEqual(exam_journey.category.title, "General Knowledge")
        self.assertEqual(
            exam_journey.user_journey[str(self.question1.id)],
            self.option1_1.id
        )

    # -------------------------------
    # 6 Test ExamResult Creation & Score
    # -------------------------------
    def test_exam_result_score_calculation(self):
        journey_data = {
            str(self.question1.id): self.option1_1.id,
            str(self.question2.id): self.option2_2.id  # wrong answer
        }

        exam_journey = ExamJourney.objects.create(
            user=self.user,
            category=self.category,
            user_journey=journey_data
        )

        # Calculate score
        total_marks = len(journey_data)
        score = 0
        for qid, oid in journey_data.items():
            option = Option.objects.get(id=oid)
            if option.is_correct:
                score += 1

        exam_result = ExamResult.objects.create(
            exam=exam_journey,
            user=self.user,
            category=self.category,
            total_marks=total_marks,
            score=score,
            total_time=300  # seconds
        )

        self.assertEqual(exam_result.score, 1)
        self.assertEqual(exam_result.total_marks, 2)
        self.assertEqual(exam_result.user.username, "john_doe")
        self.assertEqual(exam_result.exam.user_journey[str(self.question2.id)], self.option2_2.id)
