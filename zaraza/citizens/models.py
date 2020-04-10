from django.contrib.postgres.search import SearchVectorField
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.postgres.indexes import GinIndex
from django.contrib.auth.hashers import make_password
from zaraza.settings import SALT


GENDER_CHOICES = (('M', 'Man'), ('W', 'Woman'))
DOCTYPE_CHOICES = (('P', 'Passport'), ('C', "ID card"), ('D', 'Driver licence'))


class Citizen(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    first_name = models.CharField(max_length=100)
    second_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = PhoneNumberField(unique=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    doc_type = models.CharField(max_length=1, choices=DOCTYPE_CHOICES)
    document = models.CharField(max_length=16)
    birth_date = models.DateField()
    address = models.CharField(max_length=100)
    search_vector = SearchVectorField(null=True)
    hash = models.CharField(max_length=256, unique=True, default=make_password(str(document)+str(phone_number), SALT))
    image = models.CharField(max_length=4096)
    # creator = models.ForeignKey(User, on_delete=models.PROTECT)

    class Meta:
        indexes = [GinIndex(fields=['search_vector'])]
        ordering = ['created']


class Temperature(models.Model):
    created = models.DateTimeField(auto_now_add=True)

    citizen = models.ForeignKey(Citizen, on_delete=models.PROTECT)
    temperature = models.FloatField(validators=[MinValueValidator(34.0), MaxValueValidator(42.0)])
    # supervisor = models.ForeignKey(User, on_delete=models.PROTECT)

    class Meta:
        ordering = ['created']


class VerificationPhoneNumberRequest(models.Model):
    created = models.DateTimeField(auto_now_add=True)

    phone_number = PhoneNumberField()
    verification_code = models.PositiveSmallIntegerField()

    class Meta:
        ordering = ['created']
