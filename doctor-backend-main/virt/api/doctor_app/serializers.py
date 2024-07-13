from rest_framework import serializers
from .models import Doctor,Appointment,Patient
from django.utils import timezone
from django.contrib.auth.models import User






class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['id', 'name', 'specialization','image']

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = [ 'doctor', 'patient', 'date_time', 'reason']

    def validate(self, data):
        
        if data['date_time'] < timezone.now():
            raise serializers.ValidationError("Appointment date must be in the future.")
        return data
    



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email','password']      

class PatientSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Patient
        fields = ['user', 'phone_number', 'address']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        patient = Patient.objects.create(user=user, **validated_data)
        return patient




        
