# Generated by Django 3.0.4 on 2020-04-11 16:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('citizens', '0017_auto_20200411_0935'),
    ]

    operations = [
        migrations.AlterField(
            model_name='citizen',
            name='full_text',
            field=models.CharField(default='', max_length=130),
        ),
    ]