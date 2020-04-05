from rest_framework import serializers
from citizens.models import Citizen, GENDER_CHOICES


class CitizenSerializer(serializers.Serializer):
    # id = serializers.IntegerField(read_only=True)
    first_name = serializers.CharField(required=True, allow_blank=False, max_length=100)
    second_name = serializers.CharField(required=False, allow_blank=False, max_length=100)
    last_name = serializers.CharField(required=True, allow_blank=False, max_length=100)
    phone_number = serializers.CharField(required=True, allow_blank=False, max_length=128)
    gender = serializers.ChoiceField(required=True, choices=GENDER_CHOICES)
    birth_date = serializers.DateField(required=True)
    address = serializers.CharField(required=True, max_length=100)

    def create(self, validated_data):
        """
        Create and return a new `Citizen` instance, given the validated data.
        """
        return Citizen.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Citizen` instance, given the validated data.
        """
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.second_name = validated_data.get('second_name', instance.second_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.birth_date = validated_data.get('birth_date', instance.birth_date)
        instance.address = validated_data.get('address', instance.address)
        instance.save()
        return instance
