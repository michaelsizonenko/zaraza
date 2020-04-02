from rest_framework import serializers
from citizens.models import Citizen, GENDER_CHOICES


class CitizenSerializer(serializers.Serializer):

    class Meta:
        model = Citizen
        fields = ['id', 'first_name', 'second_name', 'last_name', 'phone_number', 'gender', 'birth_date', 'location']

