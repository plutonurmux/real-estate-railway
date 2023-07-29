from django.shortcuts import render
from django.http import HttpResponse
from homeApp.models import HousePost
from homeApp.filters import HouseFilter , Images
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required
from operator import itemgetter
from authenticationApp.models import ProfileAccount
from homeApp.decorators import *
from django.core.exceptions import ObjectDoesNotExist
from chatSection.functions_help import *
from .decorators import onlyUserAcess




#*/> EndPoint API For Most Viewd House
def mostViewdHouseApi(request):
    user = request.user.is_authenticated
    if user:
        user_authenticated =  request.user.username 
    else:
        user_authenticated =  False
    #/ Query and Grab The Most viewd Houses 
    house_items = HousePost.objects.all().filter(status="Active")
    nList = []
    for house in house_items:
        nList.append({"id":house.id,"viewd":house.viewd.count()})
    nList = sorted(nList, key=itemgetter('viewd')) 
    nList.reverse()
    limited_Houses = nList[:8]
    #/Grab The Actuall Records of The Queryset
    finalQuerySet = []
    for item in limited_Houses:
        house = HousePost.objects.get(id=item['id'])
        finalQuerySet.append(house)        
    #/Make Our Response
    res = []
    for item in finalQuerySet:
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
                "id" : item.id,
                "viewd_count":item.viewd.count(),
                "images":img_list,
                "saved":pers_saved,
                "city":str(item.city) + " , " + str(item.addresse),
                "title":str(item.titleAd),
                "price":str(item.price),
                "tsurface":str(item.total_surface),
                "bedroom":str(item.bedRoom),
                "toilettes":str(item.toilettes)
        }
        res.append(n_dict)
    return JsonResponse(res,safe=False)




#*/> EndPoint API For Most Liked House
def mostLikedHouseApi(request):
    user = request.user.is_authenticated
    if user:
        print("user authenticated")
        user_authenticated =  request.user.username 
    else:
        print("user need to log in")
        user_authenticated =  False

    #/ Query and Grab The Most Liked Houses 
    all_houses = list(HousePost.objects.all().filter(status="Active"))
    nList = []
    for house in all_houses:
        nList.append({"id":house.id,"saved":house.saved.count()})
    nList = sorted(nList, key=itemgetter('saved')) 
    nList.reverse()
    limited_Houses = nList[:8]

    #/Grab The Actuall Records of The Queryset
    finalQuerySet = []
    for item in limited_Houses:
        house = HousePost.objects.get(id=item['id'])
        finalQuerySet.append(house)

    #/Make Our Response
    res = []
    for item in finalQuerySet:
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
                "id" : item.id,
                "images":img_list,
                "saved":pers_saved,
                "city":str(item.city) + " , " + str(item.addresse),
                "title":str(item.titleAd),
                "price":str(item.price),
                "tsurface":str(item.total_surface),
                "bedroom":str(item.bedRoom),
                "toilettes":str(item.toilettes)
        }
        res.append(n_dict)
    return JsonResponse(res,safe=False)




#*/> EndPoint API For Add Post To Saved List
@login_required(login_url='loginPage')
def addSavedPost(request,pk):
    user = request.user
    house_item = HousePost.objects.get(id=pk)
    saved_people = house_item.saved.all()
    if user not in saved_people:
        house_item.saved.add(user)
        process = "User added to saved people"
    else:
        house_item.saved.remove(user)
        process = "User removed from saved people"
    return HttpResponse(process)




#*/> EndPoint API For Users Data
@login_required(login_url='loginPage')
def allUsers(request):
    user = request.user
    all_users = User.objects.all().exclude(username=user.username)
    res = []
    for usr in all_users:
        n_dict = { "username" : usr.username } 
        res.append(n_dict)
    return JsonResponse(res,safe=False)




#*/> EndPoint API For User Info
@login_required(login_url='loginPage')
def personalInfoApi(request):
    user = request.user
    res = []
    n_dict = {
        "username" : user.username,
        "city" : user.profileaccount.city,
        "email" : user.profileaccount.email,
        "bio" : user.profileaccount.bio,
        "phoneNumber" : user.profileaccount.phoneNumber,
        "image" : user.profileaccount.avatar,
    } 
    res.append(n_dict)
    return JsonResponse(res,safe=False)




#*/> EndPoint API For House post Info
@userViwPostPermission
def houseApi(request,pk):
    post_item = HousePost.objects.get(id=pk)
    res = []
    house_dict = {
                "id" : post_item.id,
                "state" : post_item.status,
                "category" : post_item.category, 
                "transaction" : post_item.transaction, 
                "city" : post_item.city,
                "adress" : post_item.addresse,
                # Form 2
                "rooms" : post_item.rooms,
                "etage" : post_item.etage,
                "tSurface" : post_item.total_surface,
                "toilettes" : post_item.toilettes,
                "living_room" : post_item.living_room,
                "bedRoom" : post_item.bedRoom,
                "selected_data" : {
                    "has_elevator" : post_item.elevator,
                    "has_balcony" : post_item.balcony,
                    "has_furniture" : post_item.Furniture,
                    "has_parking" : post_item.Parking,
                    "has_air_conditioner" : post_item.air_conditioner,
                    "has_furnished" : post_item.Furnished,
                    "has_securite" : post_item.securite,
                    "has_heater" : post_item.Heater,
                    "has_cuisine_equipee" : post_item.cuisine_equipee,
                    "has_terrace" : post_item.terrace,
                    "has_concierge" : post_item.concierge,
                },
                # Form 3
                "title_ad" : post_item.titleAd,
                "price" : post_item.price,
                "description" : post_item.description
    }
    res.append(house_dict)
    return JsonResponse(res,safe=False)




#*/> EndPoint API For Boutique Informations API
def boutiquePageInfo(request,pk):
    user_authenticated = request.user.is_authenticated
    if (user_authenticated == True):
        my_user = request.user
        boutique_user = User.objects.get(id=pk)
        chatExists = checkConversationExist(my_user,boutique_user)
        if (chatExists == True):
            our_chat =  getChatConversation(my_user,boutique_user)[0].id
        else: our_chat = None
    else: our_chat = None
    boutiqueObj = User.objects.get(id=pk)
    result = []
    n_dict = {
        "userAuth" : user_authenticated,
        "image" : boutiqueObj.profileaccount.avatar ,
        "username" : boutiqueObj.username,
        "bio" : boutiqueObj.profileaccount.bio,
        "phoneNumber" : boutiqueObj.profileaccount.phoneNumber,
        "chat_info" : our_chat
    }
    result.append(n_dict)
    return JsonResponse(result,safe=False)




#!/> Endpoint Api For Page That Send Request to Generate Data
@login_required(login_url='loginPage')
@onlyUserAcess
def generatePage(request):
    return render(request,"generateDataPage.html")




#!/> Endpoint Api For Generating Random Users
@login_required(login_url='loginPage')
def generateUsers(request,username,email,password,city):
    biographie = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    try:
        user = User.objects.create_user(username=username,email=email,password=password)
        user_profile = ProfileAccount.objects.create(username=user,bio=biographie,phoneNumber=699884584,email=email,city=city)
        user_profile.avatar = user_profile.getAvatar()
        user_profile.save()
        user.groups.add(1)
        user.save()
        return HttpResponse("User Created Succefully " + user.username)
    except:
        return HttpResponse("Error Happened While creating User")    




#!/> Endpoint Api For Generating Random Home Post
@login_required(login_url='loginPage')
def generateHousePosts(request,pk,desc,cat,city,addresse,title,price,transaction,rooms,etage,bedRoom,toilettes,living_room,total_surface,elevator,balcony,air_conditioner,furnished,furniture,Heater,concierge,terrace,cuisine_equipee,securite,parking):
    try:
        user = User.objects.get(id=pk)
        print(user.username)
        post_item = HousePost.objects.create(user_owner=user,description=desc,category=cat,city=city,addresse=addresse,titleAd=title,price=price,transaction=transaction,rooms=rooms,etage=etage,bedRoom=bedRoom,toilettes=toilettes,living_room=living_room,total_surface=total_surface,elevator=elevator,balcony=balcony,air_conditioner=air_conditioner,Furnished=furnished,Furniture=furniture,Heater=Heater,concierge=concierge,terrace=terrace,cuisine_equipee=cuisine_equipee,securite=securite,Parking=parking,generated=True)
        post_item.save()
        return HttpResponse("Post created successfully")
    except:
        return HttpResponse("Error Happened While creating House Post") 




#!> EndPoint API For Solving Uncreated Profile For Users
@login_required(login_url='loginPage')
def solveProfilePrb(request):
    biographie = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    all_users = User.objects.all()
    all_profiles = ProfileAccount.objects.all()

    userList = []
    for usr in all_users:
        userList.append(usr.username)

    profilesList = []
    for user_prf in all_profiles:
        profilesList.append(str(user_prf.username))

    res = []
    for pers in userList:
        if pers not in profilesList:
            res.append(pers)

    for usr in res:
        access_user = User.objects.get(username=usr)
        user_email = access_user.username+"@gmail.com"
        user_email = access_user.username+"@gmail.com"
        user_profile = ProfileAccount.objects.create(username=access_user,bio=biographie,phoneNumber=699884584,email=user_email,city="Casablanca")
        user_profile.avatar = user_profile.getAvatar()
        user_profile.save()
        access_user.groups.add(1)
        access_user.save()
    return JsonResponse(res,safe=False)