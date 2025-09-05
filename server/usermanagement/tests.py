from django.test import TestCase

# Create your tests here.
# users/tests/test_views.py
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from users.models import User, MasterUserType

class RegisterUserAPITest(APITestCase):
    def setUp(self):
        self.url = reverse('register')  # name of the endpoint in urls.py
        self.usertype = MasterUserType.objects.create(usertype='Student', is_enable=True)

    def test_register_valid_user(self):
        data = {
            "username": "testuser",
            "password": "TestPass123",
            "email": "test@example.com",
            "usertype": self.usertype.id
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Users.objects.count(), 1)

    def test_register_missing_fields(self):
        data = {
            "username": "",
            "password": "TestPass123"
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
