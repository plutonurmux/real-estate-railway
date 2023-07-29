from django.http import HttpResponse
from django.shortcuts import render , redirect
from django.contrib.auth.models import User




#> Prevent User for Acess an unFound Boutique Page From Url 
def boutiqueNotFound(view_func):
    def inside(request,*args,**kwargs):
        try:
            boutique_name = kwargs["name"]
            boutique_page = User.objects.get(username=boutique_name)
            return view_func(request,*args,**kwargs)
        except:
            return redirect("homePage")
    return inside   