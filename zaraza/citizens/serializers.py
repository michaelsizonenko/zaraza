import json
from rest_framework import serializers
from citizens.models import Citizen, GENDER_CHOICES, DOCTYPE_CHOICES, Temperature, VerificationPhoneNumberRequest


class CitizenSerializer(serializers.Serializer):
    # id = serializers.IntegerField(read_only=True)
    first_name = serializers.CharField(required=True, allow_blank=False, max_length=100)
    second_name = serializers.CharField(required=False, allow_blank=False, max_length=100)
    last_name = serializers.CharField(required=True, allow_blank=False, max_length=100)
    phone_number = serializers.CharField(required=True, allow_blank=False, max_length=128)
    gender = serializers.ChoiceField(required=True, choices=GENDER_CHOICES)
    doc_type = serializers.ChoiceField(required=True, choices=DOCTYPE_CHOICES)
    document = serializers.CharField(required=True)
    birth_date = serializers.DateField(required=True)
    address = serializers.CharField(required=True, max_length=100)
    full_data = serializers.CharField(required=True, max_length=1024)
    # creator = serializers.RelatedField(source='user', read_only=True)

    def create(self, validated_data):
        """
        Create and return a new `Citizen` instance, given the validated data.
        """
        validated_data['full_data'] = json.dumps(validated_data)
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
        instance.doc_type = validated_data.get('doc_type', instance.doc_type)
        instance.document = validated_data.get('document', instance.document)
        instance.birth_date = validated_data.get('birth_date', instance.birth_date)
        instance.address = validated_data.get('address', instance.address)
        instance.full_data = json.dumps(validated_data)
        instance.save()
        return instance


class TemperatureSerializer(serializers.Serializer):
    user = serializers.RelatedField(source='citizen', read_only=True)
    temperature = serializers.FloatField(min_value=34.0, max_value=42.0)
    supervisor = serializers.RelatedField(source='user', read_only=True)

    def create(self, validated_data):
        """
        Create and return a new `Temperature` instance, given the validated data.
        """
        return Temperature.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Temperature` instance, given the validated data.
        """
        instance.citizen = validated_data.get('citizen', instance.citizen)
        instance.temperature = validated_data.get('temperature', instance.temperature)
        instance.supervisor = validated_data.get('supervisor', instance.supervisor)
        instance.save()
        return instance


class VerificationPhoneNumberRequestSerializer(serializers.Serializer):
    phone_number = serializers.CharField(required=True, allow_blank=False, max_length=128)
    verification_code = serializers.IntegerField(required=True)

    def update(self, instance, validated_data):
        raise Exception("Forbidden method !")

    def create(self, validated_data):
        return VerificationPhoneNumberRequest.objects.create(**validated_data)
