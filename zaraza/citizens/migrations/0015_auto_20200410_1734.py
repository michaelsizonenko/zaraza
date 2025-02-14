# Generated by Django 3.0.4 on 2020-04-10 17:34

import django.contrib.postgres.search
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('citizens', '0014_citizen_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='citizen',
            name='full_data',
        ),
        migrations.AddField(
            model_name='citizen',
            name='search_vector',
            field=django.contrib.postgres.search.SearchVectorField(null=True),
        ),
        migrations.AlterField(
            model_name='citizen',
            name='hash',
            field=models.CharField(default='pbkdf2_sha256$180000$Slava urkaine!$ZfHxHf6NPSdh3ZSQ8FfEksyBgHHgFyYaeqtpi7w28sU=', max_length=256, unique=True),
        ),
    ]
