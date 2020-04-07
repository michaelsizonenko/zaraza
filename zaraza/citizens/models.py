from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth.models import User


GENDER_CHOICES = (('M', 'Man'), ('W', 'Woman'))


class Citizen(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    first_name = models.CharField(max_length=100)
    second_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone_number = PhoneNumberField(unique=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    birth_date = models.DateField()
    address = models.CharField(max_length=100)
    creator = models.ForeignKey(User, on_delete=models.PROTECT)

    class Meta:
        ordering = ['created']


class Temperature(models.Model):
    created = models.DateTimeField(auto_now_add=True)

    user = models.ForeignKey(Citizen, on_delete=models.PROTECT)
    temperature = models.FloatField(validators=[MinValueValidator(34.0), MaxValueValidator(42.0)])
    supervisor = models.ForeignKey(User, on_delete=models.PROTECT)

    class Meta:
        ordering = ['created']
