from rest_framework import serializers
from .models import CustomUser

class UserRegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'names', 'surnames', 'password', 'gender', 'date_of_birth', 'tel']

    def create(self, validated_data):

        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            names=validated_data['names'],
            surnames=validated_data['surnames'],
            password=validated_data['password'],
            gender=validated_data.get('gender', 'P'),
            date_of_birth=validated_data.get('date_of_birth'),
            tel=validated_data.get('tel')
        )
        return user