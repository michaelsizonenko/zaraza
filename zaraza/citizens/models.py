from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


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
    location = models.CharField(max_length=100)

    class Meta:
        ordering = ['created']
