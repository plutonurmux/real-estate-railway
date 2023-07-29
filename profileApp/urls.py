from django.urls import path
from .views import editProfileInfo , editPassword , myListingApi , mySavedPostApi , boutiquePage


urlpatterns = [
    path('settings/profile/', editProfileInfo , name="editProfileInfo"),
    path('settings/password/', editPassword , name="editPassword"),
    path('listing/', myListingApi , name="myListingApi"),
    path('saveditem/', mySavedPostApi , name="mySavedPostApi"),
    path('boutique/<str:name>', boutiquePage , name="boutiquePage"),
]