from django.shortcuts import render , redirect
from django.http import HttpResponse
from .filters import HouseFilter
from .models import HousePost , Images
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from .functionality import alreadySavedPost
from django.core.paginator import Paginator
import json
from .forms import CreatePostForm , CreateImageForm
from django.core.exceptions import ObjectDoesNotExist
from .decorators import *
from django.http import HttpResponseRedirect
from django.contrib import messages #import messages
from chatSection.functions_help import *



#*/ Endpoint Api For Home Here Page
def homePage(request):
    return render(request,"index.html")





#*/ Endpoint Api For Search Page
def searchPage(request):
    user = request.user.is_authenticated
    if user:
        user_authenticated =  request.user.username 
    else:
        user_authenticated =  False
    house_items = HousePost.objects.all().filter(status="Active")
    #--------- Filtring ---------
    price_order = request.GET.get("price")
    myFilter = HouseFilter(request.GET,queryset=house_items)
    house_items = myFilter.qs
    if price_order == "asc" or price_order == None:
        house_items = house_items.order_by("price")
    elif price_order == "desc":
        house_items = house_items.order_by("-price")

    #// Posts Sorted Based on the Newest Posts
    house_items = house_items.order_by("-id")   
    #--------- End Filtring ---------
    page = request.GET.get("page")
    p = Paginator(house_items,12)
    house_items = p.get_page(page)

    has_next = house_items.has_next()
    has_previous = house_items.has_previous()
    page_number = house_items.number

    house_items = house_items.object_list
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
    #> Acess search params
    city_search = request.GET.get("city","")
    cat_search = request.GET.get("category","")
    trans_search = request.GET.get("transaction","")
    price_order = request.GET.get("price","")
    pag_dict = {
        "userAuth" : user_authenticated,
        "hasNext" : has_next,
        "hasPrevious" : has_previous,
        "pageNumber" : page_number,
        #> Search Parameters
        "location" : city_search,
        "type" : cat_search,
        "transaction" : trans_search,
        "order" : price_order,
    }
    dataJSON = json.dumps(res)
    page_dict_json = json.dumps(pag_dict)
    context = {"data":dataJSON,"pagination_data":page_dict_json}
    return render(request,"searchPage.html",context)





#*/ Endpoint Api For Post Info Page
@itemPostNotFound
@userViwPostPermission
def house_info_page(request,pk):
    user = request.user.is_authenticated
    if user:
        user_authenticated =  request.user.username 
        user_req = request.user
        house_post = HousePost.objects.get(id=pk)
        viewd_people = house_post.viewd.all()
        if user_req not in viewd_people:
            house_post.viewd.add(user_req)
            print("User Added as viewd to viewed List")
    else:
        user_authenticated =  False
    try:
        house_item = HousePost.objects.get(id=pk)
        generated_item = house_item.generated
        if (generated_item == True):
            img_house_list = ["https://i.ibb.co/3cMncV2/c4c92198-fb3a-4c4b-bbb6-3aa8af8f7e73-1-zb-JQAMw-lxdx3h-F.png","https://i.ibb.co/v1n65GB/house-Image-4-V4e-G30.jpg","https://i.ibb.co/gR97SpY/no-photo.png"]
        elif (generated_item == False):
            house_pictures = Images.objects.filter(post=house_item)
            img_house_list = []
            for img in house_pictures:
                img_house_list.append(img.image.url)
        #>--------------- Recommandations -----------------
        recommandations = HousePost.objects.all().filter(category=house_item.category,city=house_item.city,status="Active").exclude(id=pk)[:12]
        res = []
        for item in recommandations:
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
        #>--------- House Info Data Response ----------
        if user_authenticated:
            my_user = user_req
            userOwner = house_item.user_owner
            chatExists = checkConversationExist(my_user,userOwner)
            if (chatExists == True):
                our_chat =  getChatConversation(my_user,userOwner)[0].id
            else:
                our_chat = None
            user_onwer_dict = {
                "name" : house_item.user_owner.username,
                "profile_pic" : house_item.user_owner.profileaccount.avatar,
                "bio" : house_item.user_owner.profileaccount.bio,
                "phone_number" : house_item.user_owner.profileaccount.phoneNumber,
                "chat_info" : our_chat,
            }
        else:
            user_onwer_dict = {
                "name" : house_item.user_owner.username,
                "profile_pic" : house_item.user_owner.profileaccount.avatar,
                "bio" : house_item.user_owner.profileaccount.bio,
                "phone_number" : house_item.user_owner.profileaccount.phoneNumber,
            }
        pers_saved = []
        for pers in house_item.saved.all():
            pers_saved.append(pers.username)
        house_dict = {
            "id" : house_item.id,
            "saved": pers_saved,
            "userAuth" : user_authenticated,
            "category" : house_item.category, 
            "images":img_house_list,
            "owner": user_onwer_dict,
            "description" : house_item.description,
            "tsurface":str(house_item.total_surface),
            "bedroom":str(house_item.bedRoom),
            "toilettes":str(house_item.toilettes),
            # other Info
            "other_details" : {
                "elevator" : [str(house_item.elevator),"elevator"],
                "balcony" : [str(house_item.balcony),"balcony"],
                "furniture" : [str(house_item.Furniture),"furniture"],
                "air_conditioner" : [str(house_item.air_conditioner),"air_conditioner"],
                "furnished" : [str(house_item.Furnished),"furnished"],
                "heater" : [str(house_item.Heater),"heater"],
                "concierge" : [str(house_item.concierge),"concierge"],
                "terrace" : [str(house_item.terrace),"terrace"],
                "cuisine_equipee" : [str(house_item.cuisine_equipee),"cuisine_equipee"],
                "securite" : [str(house_item.securite),"securite"],
                "parking" : [str(house_item.Parking),"parking"],
            },
            # for table
            "type" : house_item.category,
            "floor" : house_item.etage,
            "rooms" : house_item.rooms,
            "salon" : house_item.living_room,
            "city" : house_item.city,
            "adress" : house_item.addresse,
            "saved":pers_saved,
            "title":str(house_item.titleAd),
            "price":str(house_item.price),
        }
        dataJSON = json.dumps(house_dict)
        recommandationJson = json.dumps(res)
        context = {"data":dataJSON,"recommandations":recommandationJson}
        return render(request,"houseINfo.html",context)
    except ObjectDoesNotExist:
        return redirect("homePage")





#*/ Endpoint Api For Create Post Page
@login_required(login_url='loginPage')
def createPostPage(request):
    user = request.user
    myForm = CreatePostForm()
    if request.method == "POST":
        images = request.FILES.getlist('images')
        category = request.POST.get("category")
        city = request.POST.get("city")
        addresse = request.POST.get("addresse")
        titleAd = request.POST.get("titleAd")
        price = request.POST.get("price")
        description = request.POST.get("description")
        transaction = request.POST.get("transaction")
        rooms = request.POST.get("rooms")
        etages = request.POST.get("etage")
        bedRoom = request.POST.get("bedRoom")
        toilettes = request.POST.get("toilettes")
        living_room = request.POST.get("living_room")
        total_surface = request.POST.get("total_surface")
        elevator = request.POST.get("elevator")
        balcony = request.POST.get("balcony")
        air_conditioner = request.POST.get("air_conditioner")
        furnished = request.POST.get("Furnished")
        furniture = request.POST.get("Furniture")
        Heater = request.POST.get("Heater")
        concierge = request.POST.get("concierge")
        terrace = request.POST.get("terrace")
        cuisine_equipee = request.POST.get("cuisine_equipee")
        securite = request.POST.get("securite")
        parking = request.POST.get("Parking")
        post_item = HousePost.objects.create(user_owner=user,description=description,category=category,city=city,addresse=addresse,titleAd=titleAd,price=price,transaction=transaction,rooms=rooms,etage=etages,bedRoom=bedRoom,toilettes=toilettes,living_room=living_room,total_surface=total_surface,elevator=elevator,balcony=balcony,air_conditioner=air_conditioner,Furnished=furnished,Furniture=furniture,Heater=Heater,concierge=concierge,terrace=terrace,cuisine_equipee=cuisine_equipee,securite=securite,Parking=parking)
        post_item.save()
        images_length = len(images)
        if images_length > 0:
            for img in images:
                post_img = Images.objects.create(post=post_item,image=img)
                post_img.save()
        if images_length == 0:
            post_img = Images.objects.create(post=post_item)

        messages.success(request, 'Your Post Created Successfully')
        return redirect('house_info_page', pk=post_item.id)
    context = {"form":myForm}
    return render(request,"create_post_page.html",context)





#*/ Endpoint Api For Edit Post Page
@login_required(login_url='loginPage')
@itemPostNotFound
@userEditPostPermission
def editPostPage(request,pk):
    post_item = HousePost.objects.get(id=pk)
    if request.method == "POST":
        images = request.FILES.getlist('images')
        category = request.POST.get("category")
        post_item.category = category
        transaction = request.POST.get("transaction")
        post_item.transaction = transaction
        city = request.POST.get("city")
        post_item.city = city
        addresse = request.POST.get("addresse")
        post_item.addresse = addresse
        rooms = request.POST.get("rooms")
        post_item.rooms = rooms
        etage = request.POST.get("etage")
        post_item.etage = etage
        total_surface = request.POST.get("total_surface")
        post_item.total_surface = total_surface
        toilettes = request.POST.get("toilettes")
        post_item.toilettes = toilettes
        living_room = request.POST.get("living_room")
        post_item.living_room = living_room
        bedRoom = request.POST.get("bedRoom")
        post_item.bedRoom = bedRoom
        elevator = request.POST.get("elevator")
        post_item.elevator = elevator
        balcony = request.POST.get("balcony")
        post_item.balcony = balcony
        Furniture = request.POST.get("Furniture")
        post_item.Furniture = Furniture
        parking = request.POST.get("Parking")
        post_item.Parking = parking
        air_conditioner = request.POST.get("air_conditioner")
        post_item.air_conditioner = air_conditioner    
        furnished = request.POST.get("Furnished")
        post_item.Furnished = furnished     
        heater = request.POST.get("Heater")
        post_item.Heater = heater     
        concierge = request.POST.get("concierge")
        post_item.concierge = concierge     
        terrace = request.POST.get("terrace")
        post_item.terrace = terrace     
        cuisine_equipee = request.POST.get("cuisine_equipee")
        post_item.cuisine_equipee = cuisine_equipee 
        securite = request.POST.get("securite")
        post_item.securite = securite     
        titlePost = request.POST.get("titleAd")
        post_item.titleAd = titlePost     
        price = request.POST.get("price")
        post_item.price = price 
        description = request.POST.get("description")
        post_item.description = description 
        pos_state = request.POST.get("state")
        post_item.status = pos_state 
        post_item.save()
        images_length = len(images)
        post_img = Images.objects.all().filter(post=post_item)
        if images_length > 0:
            for img in post_img:
                img.delete()
            post_img = Images.objects.all().filter(post=post_item)
            for img in images:
                post_img = Images.objects.create(post=post_item,image=img)
                post_img.save()
        return redirect("myListingApi")

    house_dict = { "id" : pk}
    dataJSON = json.dumps(house_dict)   
    context = {"data":dataJSON}
    return render(request,"editPostPage.html",context)





#*/ Endpoint Api For Delete Post Page
@login_required(login_url='loginPage')
@itemPostNotFound
@userEditPostPermission
def deletePostItem(request,pk):
    try:
        house_item = HousePost.objects.get(id=pk)
        house_item.delete()
        return HttpResponseRedirect(request.META.get('HTTP_REFERER', '/'))
    except ObjectDoesNotExist:
        return redirect("homePage")    