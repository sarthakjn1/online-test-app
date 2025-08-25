from rest_framework import serializers
from .models import User, MasterUserType, UserCategory
from django.contrib.auth.hashers import make_password, check_password


class MasterUserTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MasterUserType
        db_table = "master_usertypes"
        fields = ['id', 'usertype', 'is_enable']


class UserCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCategory
        db_table = "user_categories"
        fields = ['id', 'category', 'is_enable']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        db_table = "users"
        fields = ['id', 'username', 'email', 'password', 'usertype', 'category', 'is_active', 'registered_on']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])  # hash password
        return super().create(validated_data)
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        try:
            user = User.objects.get(email=data['email'])
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password")

        if not check_password(data['password'], user.password):
            raise serializers.ValidationError("Invalid email or password")

        if not user.is_active:
            raise serializers.ValidationError("User is inactive")

        data['user'] = user
        return data