# Generated by Django 5.0.6 on 2024-07-07 10:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctor_app', '0004_appointment_reason'),
    ]

    operations = [
        migrations.AddField(
            model_name='doctor',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='doctors/'),
        ),
    ]
