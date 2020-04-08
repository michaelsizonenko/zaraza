from django.urls import path
from citizens import views

urlpatterns = [
    path('citizens/', views.citizen_list),
    path('citizens/phone/', views.citizen_by_phone),
    path('citizens/document/', views.citizen_by_document),
    path('temperature/', views.citizen_list),
    path('send-verification-code/', views.send_verification_code)
]
