# from enum import Flag
# from operator import pos
# from pickle import FALSE
# from pyexpat import model
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import Group




cities_choice = (
    ("Marrakech", "Marrakech"),
    ("Fès", "Fès"),
    ("Chefchaouen", "Chefchaouen"),
    ("Essaouira", "Essaouira"),
    ("Tanger", "Tanger"),
    ("Casablanca", "Casablanca"),
    ("Rabat", "Rabat"),
    ("Meknès", "Meknès"),
    ("Agadir", "Agadir"),
    ("Ouarzazate", "Ouarzazate"),
    ("Asilah", "Asilah"),
    ("Tétouan", "Tétouan"),
    ("Merzouga", "Merzouga"),
    ("El Jadida", "El Jadida"),
    ("Tinghir", "Tinghir"),
    ("Ifrane", "Ifrane"),
    ("Taroudant ", "Taroudant"),
    ("Larache", "Larache"),
    ("Aït Ben Haddou", "Aït Ben Haddou"),
    ("Al Hoceïma", "Al Hoceïma"),
    ("Oujda", "Oujda"),
    ("Sidi Ifni", "Sidi Ifni"),
    ("Azrou", "Azrou"),
    ("Béni Mellal", "Béni Mellal"),
    ("Midelt", "Midelt"),
    ("Safi", "Safi"),
    ("Taza", "Taza"),
    ("Martil", "Martil"),
    ("Oued Zem", "Oued Zem"),
    ("Sefrou", "Sefrou"),
    ("Taourirt", "Taourirt"),
    ("Guercif", "Guercif"),
    ("Tiflet", "Tiflet"),
    ("Ouazzane", "Ouazzane"),
    ("Youssoufia", "Youssoufia"),
    ("Ksar El-Kébir", "Ksar El-Kébir"),
    ("Fnideq", "Fnideq"),
    ("Sidi Kacem", "Sidi Kacem"),
    ("Saïdia", "Saïdia"),
    ("M'diq", "M'diq"),
    ("Tiznit", "Tiznit"),
    ("Moulay Idriss", "Moulay Idriss"),
    ("Zerhoun", "Zerhoun"),
    ("Guelmim", "Guelmim"),
    ("Mohammédia", "Mohammédia"),
    ("Imlil", "Imlil"),
    ("Nador", "Nador"),
    ("Berrchid", "Berrchid"),
    ("Settat", "Settat"),
    ("Berkane", "Berkane"),
)
class ProfileAccount(models.Model):
    username = models.OneToOneField(User, on_delete=models.CASCADE)
    phoneNumber = models.CharField(max_length=12,null=True,blank=True,help_text="Enter your Phone number")
    email = models.EmailField(null=False,blank=False)
    city = models.CharField(max_length=50,choices=cities_choice,default="Casablanca")
    avatar = models.URLField(blank=False,null=False,default="")
    bio = models.TextField(max_length=600,blank=True, default="No Bio", null=True)
    date_created = models.DateField(null=True,blank=False,auto_now_add=True)
    last_login = models.DateField(null=True,blank=False,auto_now=True)

    def __str__(self):
        return str(self.username)

    def getAvatar(self):
        url = "https://avatars.dicebear.com/api/identicon/{}.png"
        result = url.format(self.username)
        return result







subject_choice = (
    ("Bug problem", "Bug problem"),
    ("partnership", "partnership"),
    ("Just Saying Hello", "Just Saying Hello"),
)
class InboxMessages(models.Model):
    username = models.CharField(max_length=50,null=False, blank=False)
    email = models.EmailField(null=False,blank=False)
    subject = models.CharField(max_length=50,choices=subject_choice,default="Bug problem")
    message = models.TextField(max_length=750,blank=False, null=False)
    date_created = models.DateField(null=True,blank=False,auto_now_add=True)

    def __str__(self):
        msg_name = "Message From " + self.username + " at " + str(self.date_created)
        return msg_name