from django.urls import path
from citizens import views

urlpatterns = [
    path('citizens/', views.citizen_list),
    path('citizens/<int:pk>/', views.citizen_detail),
    path('temperature/', views.citizen_list),
    path('send_verification_code/', views.send_verification_code)
]
