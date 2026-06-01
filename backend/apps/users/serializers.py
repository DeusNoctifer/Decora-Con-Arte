from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers

from .models import CustomUser
from .validators import validate_phone


class UserRegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        style={'input_type': 'password'},
    )

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'names', 'surnames', 'password', 'gender', 'date_of_birth', 'tel']

    def validate_tel(self, value):
        if not value:
            return value
        return validate_phone(value)

    def validate(self, attrs):
        password = attrs.get('password')
        if password:
            user = CustomUser(
                email=attrs.get('email', ''),
                names=attrs.get('names', ''),
                surnames=attrs.get('surnames', ''),
            )
            try:
                validate_password(password, user=user)
            except DjangoValidationError as exc:
                raise serializers.ValidationError({'password': list(exc.messages)})
        return attrs

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
