from .models import HousePost
from django.contrib.auth.models import User




def alreadySavedPost(usr_pk,house_pk):
    user = User.objects.get(id=usr_pk)
    house = HousePost.objects.get(id=house_pk)
    if user in house.saved.all():
        return True
    else:
        return False