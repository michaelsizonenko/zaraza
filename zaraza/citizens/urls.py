from django.urls import path
from citizens import views

urlpatterns = [
    path('citizens/', views.citizen_list),
    path('citizens/details/', views.citizen_detail),
    path('temperature/', views.temperature_list),
    path('send-verification-code/', views.send_verification_code)
]
