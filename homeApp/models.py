from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save , pre_save
from django.dispatch import receiver
from PIL import Image


category_house = (
    ("House", "House"),
    ("Appartement", "Appartement"),
    ("Villa", "Villa"),
    ("Duplex", "Duplex"),
)
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
transaction_choice = (
    ("Vente", "Vente"),
    ("Location (Per Day)", "Location (Per Day)"),
    ("Location (Per Month)", "Location (Per Month)"),
)
status = (
    ("Active", "Active"),
    ("Desactive", "Desactive")
)
class HousePost(models.Model):
    user_owner = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=50,choices=category_house,default="House")
    city = models.CharField(max_length=50,choices=cities_choice,default="Casablanca")
    addresse = models.CharField(max_length=95 , null=False , blank=False)
    titleAd = models.CharField(max_length=80 , null=True , blank=True)
    price = models.IntegerField(blank=False, default=0, null=False)
    description = models.TextField(max_length=600,blank=True, default="No Description !!!", null=True)
    date_created = models.DateTimeField(auto_now=True)
    saved = models.ManyToManyField(User , blank=True , related_name='savePost')
    viewd = models.ManyToManyField(User , blank=True , related_name='viewdPost')
    transaction = models.CharField(max_length=50,choices=transaction_choice,default="Vente")
    status = models.CharField(max_length=50,choices=status,default="Active")
    #*/--- House Infos ---
    rooms = models.IntegerField(blank=True, default=1, null=True)
    etage = models.IntegerField(blank=True, default=1, null=True)
    bedRoom = models.IntegerField(blank=True, default=1, null=True)
    toilettes = models.IntegerField(blank=True, default=1, null=True)
    living_room = models.IntegerField(blank=True, default=1, null=True)
    total_surface = models.IntegerField(blank=False, default=0, null=False)
    #*/--- House Other Details Booleans ---
    elevator = models.BooleanField(blank=True, default=False , null=True)
    balcony = models.BooleanField(blank=True, default=False , null=True)
    Furniture = models.BooleanField(blank=True, default=False , null=True)
    air_conditioner = models.BooleanField(blank=True, default=False , null=True)
    Furnished = models.BooleanField(blank=True, default=False , null=True)
    Heater = models.BooleanField(blank=True, default=False , null=True)
    concierge = models.BooleanField(blank=True, default=False , null=True)
    terrace = models.BooleanField(blank=True, default=False , null=True)
    cuisine_equipee = models.BooleanField(blank=True, default=False , null=True)
    securite = models.BooleanField(blank=True, default=False , null=True)
    Parking = models.BooleanField(blank=True, default=False , null=True)
    generated = models.BooleanField(blank=True, default=False , null=True)

    def __str__(self):
        return str(self.titleAd)
    
    def total_likes(self):
        return self.likes.count()

    def generatePostTitle(self):
        title = "{type} with {surface} m2 in {city}"
        title = title.format(type = self.category,surface = self.total_surface, city = self.city)
        return title

def generateTitleAuto(sender,instance,created,**kwargs):
    if created or (created == False):
        post_title = instance.titleAd
        if (post_title == None or post_title == "" or post_title == " "):
            new_title = instance.generatePostTitle()
            instance.titleAd = new_title
            instance.save()
post_save.connect(generateTitleAuto,sender=HousePost)







class Images(models.Model):
    post = models.ForeignKey(HousePost, on_delete=models.CASCADE , null=True , blank=True)
    image = models.ImageField(upload_to='images' , null=False , default="no-photo.png")
    def __str__(self):
        image_name = "Image of " + str(self.post.user_owner) + " Post With id " + str(self.post.id)
        return str(image_name)
