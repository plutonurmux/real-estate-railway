from django.http import HttpResponse
from django.shortcuts import render , redirect
from django.contrib.auth.models import User




def onlyUserAcess(view_func):
    def inside(request,*args,**kwargs):
        groupExist = request.user.groups.exists()
        if groupExist == True:
            group_name = request.user.groups.all()[0].name
            if (group_name == "admin"):
                return view_func(request,*args,**kwargs)
            else:
                return redirect("homePage")
        else:
            return redirect("homePage")
    return inside