# Generated by Django 3.0.4 on 2020-04-10 08:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('citizens', '0010_remove_citizen_creator'),
    ]

    operations = [
        migrations.AddField(
            model_name='citizen',
            name='full_data',
            field=models.TextField(default='{}', max_length=1024),
            preserve_default=False,
        ),
    ]