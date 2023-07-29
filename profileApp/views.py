from django.shortcuts import render
from django.http import HttpResponse
from authenticationApp.models import ProfileAccount
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate , login , logout
from homeApp.models import HousePost , Images
from django.core.paginator import Paginator
from django.http import JsonResponse
import json
from .decorators import *






#*/> EndPoint API For Edit Profile Informations
@login_required(login_url="loginPage")
def editProfileInfo(request):
    user = request.user.profileaccount
    if request.method == "POST":
        new_username = request.POST.get("username")
        location = request.POST.get("city")
        new_phoneNumber = request.POST.get("phoneNumber")   
        new_bio = request.POST.get("biographie")   

        if ((len(new_username) >= 5 and len(new_username) <= 20)  and (location and len(new_phoneNumber) == 9) and (len(new_bio) >= 5 and len(new_bio) < 300)):
            user = request.user
            user.username = new_username
            user.save()
            user.profileaccount.phoneNumber = new_phoneNumber
            user.profileaccount.city = location
            user.profileaccount.bio = new_bio
            user.profileaccount.save()
            return HttpResponse("The User Data Saved Successfully")
        else:    
            return HttpResponse("Data Has not been saved Please Try Again!")
    return render(request,"accountSettings/index.html")





#*/> EndPoint API For Edit User Password
@login_required(login_url="loginPage")
def editPassword(request):
    user = request.user
    print(user.id)
    if request.method == "POST":
        actuall_password = request.POST.get("actuall_password")
        actuall_password_correct = user.check_password(actuall_password)
        new_password = request.POST.get("new_password")
        conf_password = request.POST.get("confirmation_password")

        if (actuall_password_correct and (new_password == conf_password) and (len(new_password) >= 8 and len(new_password) <= 15)):
            user = User.objects.get(id=user.id)
            user.set_password(new_password)
            user.save()
            login(request,user)
            return HttpResponse("Data has been saved successfully")
        else:
            return HttpResponse("Your Actuall Password your Enter is Invalid")
    return render(request,"accountSettings/passwordEdit.html")





#*/> EndPoint API For User Listing Posts
@login_required(login_url="loginPage")
def myListingApi(request):
    user = request.user
    myListing = HousePost.objects.all().filter(user_owner=user)
    myListing = list(myListing)
    myListing.reverse()
    page = request.GET.get("page")
    p = Paginator(myListing,4)
    myListing = p.get_page(page)
    has_next = myListing.has_next()
    has_previous = myListing.has_previous()
    page_number = myListing.number
    house_items = myListing.object_list
    res = []
    for item in house_items:
        generated_item = item.generated
        img_list = []
        if (generated_item == True):
            img_list = "https://i.ibb.co/3cMncV2/c4c92198-fb3a-4c4b-bbb6-3aa8af8f7e73-1-zb-JQAMw-lxdx3h-F.png"
        elif (generated_item == False):
            all_images = Images.objects.filter(post=item)
            img_list = all_images[0].image.url
        pers_saved = []
        for pers in item.saved.all():
            pers_saved.append(pers.username)
        n_dict = {
                "id" : item.id,
                "status":item.status,
                "images":img_list,
                "price":str(item.price),
                "saved":pers_saved,
                "title":str(item.titleAd),
                "category" : str(item.category),
                "city":str(item.city) + " , " + str(item.addresse),
                "username" : user.username,
        }
        res.append(n_dict)
    pag_dict = {
        "username" : user.username,
        "hasNext" : has_next,
        "hasPrevious" : has_previous,
        "pageNumber" : page_number,
    }
    dataJSON = json.dumps(res)
    page_dict_json = json.dumps(pag_dict)
    context = {"data":dataJSON,"pagination_data":page_dict_json}
    return render(request,"myListining/index.html",context)





#*/> EndPoint API For User Saved Posts
@login_required(login_url="loginPage")
def mySavedPostApi(request):
    user = request.user
    mySavedItem = HousePost.objects.all().filter(saved=user,status="Active")
    mySavedItem = list(mySavedItem)
    mySavedItem.reverse()

    page = request.GET.get("page")
    p = Paginator(mySavedItem,4)
    mySavedItem = p.get_page(page)

    has_next = mySavedItem.has_next()
    has_previous = mySavedItem.has_previous()
    page_number = mySavedItem.number

    house_items = mySavedItem.object_list
    res = []
    
    for item in house_items:
        generated_item = item.generated
        img_list = []
        if (generated_item == True):
            img_list = "https://i.ibb.co/3cMncV2/c4c92198-fb3a-4c4b-bbb6-3aa8af8f7e73-1-zb-JQAMw-lxdx3h-F.png"
        elif (generated_item == False):
            all_images = Images.objects.filter(post=item)
            img_list = all_images[0].image.url
 
        pers_saved = []
        for pers in item.saved.all():
            pers_saved.append(pers.username)
        n_dict = {
                "id" : item.id,
                "images":img_list,
                "price":str(item.price),
                "saved":pers_saved,
                "title":str(item.titleAd),
                "category" : str(item.category),
                "city":str(item.city) + " , " + str(item.addresse),
                "username" : user.username,
        }
        res.append(n_dict)
    pag_dict = {
        "hasNext" : has_next,
        "hasPrevious" : has_previous,
        "pageNumber" : page_number,
    }
    dataJSON = json.dumps(res)
    page_dict_json = json.dumps(pag_dict)
    context = {"data":dataJSON,"pagination_data":page_dict_json}
    return render(request,"savedHome/savedHome.html",context)






#*/> EndPoint API For Boutique Page
@boutiqueNotFound
def boutiquePage(request,name):
    user = request.user.is_authenticated
    if user:
        user_authenticated =  request.user.username 
    else:
        user_authenticated =  False
    boutique = User.objects.get(username=name)
    pk = boutique.id
    boutique_fname = boutique.username
    boutiqueListing = HousePost.objects.all().filter(user_owner=boutique,status="Active")
    boutiqueListing = list(boutiqueListing)
    boutiqueListing.reverse()
    boutique_listing_items = len(boutiqueListing)
    page = request.GET.get("page")
    p = Paginator(boutiqueListing,8)
    boutiqueListing = p.get_page(page)
    has_next = boutiqueListing.has_next()
    has_previous = boutiqueListing.has_previous()
    page_number = boutiqueListing.number
    house_items = boutiqueListing.object_list
    res = []
    for item in house_items:
        generated_item = item.generated
        img_list = []
        if (generated_item == True):
            img_list = ["https://i.ibb.co/3cMncV2/c4c92198-fb3a-4c4b-bbb6-3aa8af8f7e73-1-zb-JQAMw-lxdx3h-F.png","https://i.ibb.co/v1n65GB/house-Image-4-V4e-G30.jpg","https://i.ibb.co/gR97SpY/no-photo.png"]
        elif (generated_item == False):
            all_images = Images.objects.filter(post=item)
            for img in all_images:
                img_list.append(img.image.url)
        pers_saved = []
        for pers in item.saved.all():
            pers_saved.append(pers.username)
        n_dict = {
                "is_auth" : user_authenticated,
                "boutique_name" : boutique.username,
                "boutique_listing_count" : boutique_listing_items,
                "id" : item.id,
                "images":img_list,
                "saved":pers_saved,
                "city":str(item.city) + " , " + str(item.addresse),
                "title":str(item.titleAd),
                "price":str(item.price),
                "tsurface":str(item.total_surface),
                "bedroom":str(item.bedRoom),
                "toilettes":str(item.toilettes),
                # Pagination data
                "hasNext" : has_next,
                "hasPrevious" : has_previous,
                "pageNumber" : page_number,
        }
        res.append(n_dict)
    #> Acess search params
    pag_dict = {
        "userAuth" : user_authenticated,
    }
    dataJSON = json.dumps(res)
    page_dict_json = json.dumps(pag_dict)
    context = {"boutiqueid":pk,"data":dataJSON,"boutiquename":boutique_fname,"itemscount":boutique_listing_items,"pagination_data":page_dict_json}
    return render(request,"boutiquePage/boutiquePage.html",context)