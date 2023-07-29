# from dataclasses import field
# from pyexpat import model
from django.contrib.auth.models import User
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import ProfileAccount



class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ["username","password1","password2"]


class CreateProfile(forms.ModelForm):
    class Meta:
        model = ProfileAccount
        fields = ["email","phoneNumber","city"]