from django.urls import path
from . import views
from .views import LoginView,DoctorListView,AppointmentCreateView,signup,current_user
from django.conf import settings
from django.conf.urls.static import static

urlpatterns=[
   
    path('api/login/',LoginView.as_view()),
    path('api/doctors/',DoctorListView.as_view(),name="doctor-list"),
    path('api/appointments',AppointmentCreateView.as_view(),name="create-appointment"),
    path('api/signup',views.signup,name="sign-up"),
    path('api/current_user',views.current_user,name="current-user")
    
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)