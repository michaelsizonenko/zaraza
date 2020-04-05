from rest_framework import serializers
from citizens.models import Citizen, GENDER_CHOICES


class CitizenSerializer(serializers.Serializer):

    class Meta:
        model = Citizen
        fields = ['first_name', 'second_name', 'last_name', 'phone_number', 'gender', 'birth_date', 'location']

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
        instance.location = validated_data.get('location', instance.location)
        instance.save()
        return instance
