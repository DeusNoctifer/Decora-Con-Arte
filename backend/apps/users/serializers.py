from rest_framework import serializers
from .models import CustomUser

class UserRegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True, 
        min_length=8,
        style={'input_type': 'password'}
    )

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'names', 'surnames', 'password', 'gender', 'date_of_birth', 'tel']

    def create(self, validated_data):

        email = validated_data.pop('email')
        names = validated_data.pop('names')
        surnames = validated_data.pop('surnames')
        password = validated_data.pop('password')

        user = CustomUser.objects.create_user(
            email=email,
            names=names,
            surnames=surnames,
            password=password,
            **validated_data
        )
        return user