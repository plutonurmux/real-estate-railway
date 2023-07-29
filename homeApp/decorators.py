from django.http import HttpResponse
from django.shortcuts import render , redirect
from django.contrib.auth.models import User
from .models import HousePost , Images




#> Confirm that the user have the permission to Edit a Post
def userEditPostPermission(view_func):
    def inside(request,*args,**kwargs):
        auth_user = request.user
        post_item_id = kwargs["pk"]
        post_item_owner = HousePost.objects.get(id=post_item_id).user_owner
        if (auth_user == post_item_owner):
            return view_func(request,*args,**kwargs)
        else:
            return redirect("homePage")
    return inside




#> Prevent User for Acess a Home Post With (Hide Status) Until if the user He's The Owner
def userViwPostPermission(view_func):
    def inside(request,*args,**kwargs):
        auth_user = request.user
        post_item_id = kwargs["pk"]
        post_item_status = HousePost.objects.get(id=post_item_id).status
        post_item_owner = HousePost.objects.get(id=post_item_id).user_owner

        if (post_item_status == "Active") or (auth_user == post_item_owner):
            return view_func(request,*args,**kwargs)
        else:
            return redirect("searchPage")
    return inside    




#> Prevent User for Acess an unFound Home Post From Url 
def itemPostNotFound(view_func):
    def inside(request,*args,**kwargs):
        try:
            post_item_id = kwargs["pk"]
            post_item = HousePost.objects.get(id=post_item_id)
            return view_func(request,*args,**kwargs)
        except:
            return redirect("searchPage")
    return inside   