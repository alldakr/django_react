from django.urls import path
from . import views

urlpatterns = [
    path("signup/", views.SingupView.as_view(), name="login")
]
