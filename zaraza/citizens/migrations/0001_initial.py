# Generated by Django 3.0.4 on 2020-04-02 08:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Citizen',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('first_name', models.CharField(max_length=100)),
                ('second_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('phone_number', models.CharField(max_length=12, unique=True)),
                ('gender', models.CharField(choices=[('M', 'Man'), ('W', 'Woman')], max_length=1)),
                ('birth_date', models.DateField()),
                ('location', models.CharField(max_length=100)),
            ],
            options={
                'ordering': ['created'],
            },
        ),
    ]