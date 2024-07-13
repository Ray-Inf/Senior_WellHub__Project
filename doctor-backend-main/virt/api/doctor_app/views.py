
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import generics,permissions
from .models import Doctor,Appointment,Patient
from .serializers import DoctorSerializer,AppointmentSerializer,PatientSerializer,UserSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import api_view,permission_classes
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if username is None or password is None:
            return Response({'error': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if user is not None:
            patient_id=user.patient.id
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'PatientId':patient_id, 'token': token.key})
        else:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)

    def options(self, request):
        return Response(status=status.HTTP_200_OK)
    

class DoctorListView(generics.ListAPIView):
    permission_classes=[AllowAny]
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
   

class AppointmentCreateView(generics.CreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        patient = self.request.user.patient
        appointment=serializer.save(patient=patient)
        send_appointment_confirmation_email(appointment.id)




@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
   
    serializer = PatientSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
def send_appointment_confirmation_email(appointment_id):
    try:
        appointment = Appointment.objects.get(id=appointment_id)
        patient_name = appointment.patient.user.username
        doctor_name = appointment.doctor.name
        appointment_datetime = appointment.date_time.strftime("%Y-%m-%d %H:%M")

        subject = 'Appointment Confirmation'
        html_message = render_to_string('emails/confirmation_mail.html', {
            'patient_name': patient_name,
            'doctor_name': doctor_name,
            'appointment_datetime': appointment_datetime,
        })
        plain_message = strip_tags(html_message)

    
        send_mail(
            subject,
            plain_message,
            settings.DEFAULT_FROM_EMAIL,
            [appointment.patient.user.email],
            html_message=plain_message,
        )

        print(f"Appointment confirmation email sent successfully to {appointment.patient.user.email}")
        return Response({'message': 'Email sent successfully'}, status=200)
      
            

    except Appointment.DoesNotExist:
        print(f"Appointment with ID {appointment_id} does not exist.")
        return False
    except Exception as e:
        print(f"Error sending appointment confirmation email: {str(e)}")
        return False
    



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


