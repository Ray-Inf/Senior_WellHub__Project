from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

class Patient(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    phone_number=models.CharField(max_length=15,blank=True,null=True)
    address=models.TextField(blank=True,null=True)

    def __str__(self):
        return self.user.username
    
class Doctor(models.Model):
    name=models.CharField(max_length=255)
    specialization=models.CharField(max_length=255)
    image = models.ImageField(upload_to='doctors/', null=True, blank=True)

    def __str__(self):
        return self.name
    
class Appointment(models.Model):
    patient=models.ForeignKey(Patient,on_delete=models.CASCADE)
    doctor=models.ForeignKey(Doctor,on_delete=models.CASCADE)
    date_time=models.DateTimeField(default=datetime.now)
    reason=models.TextField()

    def __str__(self):
        return self.patient.user.username