# Generated by Django 3.0.4 on 2020-04-10 12:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('citizens', '0012_citizen_hash'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='temperature',
            name='supervisor',
        ),
    ]