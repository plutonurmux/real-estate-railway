from django.http import HttpResponse
from django.shortcuts import render , redirect
from django.contrib.auth.models import User




def userAlreadyAuthenticated(view_func):
    def inside(request,*args,**kwargs):
        if request.user.is_authenticated:
            return redirect("searchPage")
        else:
            return view_func(request,*args,**kwargs)
    return inside



def onlyUserAcess(view_func):
    def inside(request,*args,**kwargs):
        group = None
        if request.user.groups.exists():
            group = request.user.groups.all()[0].name
        elif group == "client":
            return view_func(request,*args,**kwargs)
        else:
            return HttpResponse("You are not allowed to visit this page")    
    return inside