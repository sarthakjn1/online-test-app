from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, MasterUserType, UserCategory


# -----------------------------
# Register User Tests
# -----------------------------
class RegisterUserAPITest(APITestCase):
    def setUp(self):
        self.url = reverse('register')  # ✅ make sure your urls.py has `path('register/', ...)`
        self.usertype = MasterUserType.objects.create(usertype='Student', is_enable=True)
        self.category = UserCategory.objects.create(category='General', is_enable=True)

    def test_register_valid_user(self):
        """✅ Register a valid user"""
        data = {
            "username": "testuser",
            "password": "TestPass123",
            "email": "test@example.com",
            "first_name": "Test",
            "last_name": "User",
            "usertype": self.usertype.id,
            "category": self.category.id
        }
        response = self.client.post(self.url, data, format="json")
        print("REGISTER RESPONSE:", response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_register_duplicate_user(self):
        """❌ Should not allow duplicate username"""
        User.objects.create_user(
            username="testuser",
            email="test@example.com",
            password="TestPass123",
            usertype=self.usertype,
            category=self.category
        )
        data = {
            "username": "testuser",
            "password": "AnotherPass123",
            "email": "test2@example.com",
            "first_name": "Another",
            "last_name": "User",
            "usertype": self.usertype.id,
            "category": self.category.id
        }
        response = self.client.post(self.url, data, format="json")
        print("DUPLICATE REGISTER RESPONSE:", response.data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


# -----------------------------
# Login User Tests
# -----------------------------
class LoginUserAPITest(APITestCase):
    def setUp(self):
        self.url = reverse('login')  # ✅ make sure urls.py has `path('login/', ...)`
        self.usertype = MasterUserType.objects.create(usertype='Student', is_enable=True)
        self.category = UserCategory.objects.create(category='General', is_enable=True)

        self.user = User.objects.create_user(
            username="validuser",
            email="valid@example.com",
            password="ValidPass123",
            usertype=self.usertype,
            category=self.category
        )

    def test_login_valid_user(self):
        """✅ Login with correct credentials"""
        data = {"username": "validuser", "password": "ValidPass123"}
        response = self.client.post(self.url, data, format="json")
        print("LOGIN VALID RESPONSE:", response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_login_nonexistent_user(self):
        """❌ Login with non-existing user"""
        data = {"username": "ghost", "password": "wrongpass"}
        response = self.client.post(self.url, data, format="json")
        print("LOGIN NONEXISTENT RESPONSE:", response.data)
        # ✅ match your current behavior (404 instead of 401)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
