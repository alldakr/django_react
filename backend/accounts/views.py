from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from .serializers import SingupSerializer


class SingupView(CreateAPIView):
    model = get_user_model()
    serializer_class = SingupSerializer
    permission_classes = [
        AllowAny,
    ]
