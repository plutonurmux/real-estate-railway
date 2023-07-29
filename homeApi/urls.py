from django.urls import path
from .views import mostViewdHouseApi , mostLikedHouseApi , addSavedPost , allUsers , personalInfoApi , houseApi , boutiquePageInfo
from .views import generatePage , generateUsers ,  generateHousePosts , solveProfilePrb


urlpatterns = [
    path('most-viewd-house/', mostViewdHouseApi , name="mostViewdHouseApi"),
    path('most-liked-house/', mostLikedHouseApi , name="mostLikedHouseApi"),
    path('savedposts/add/<int:pk>',addSavedPost, name="addSavedPost"),
    path('allusers',allUsers, name="allUsers"),
    path('personalInfoApi',personalInfoApi, name="personalInfoApi"),
    path('houseinfo/<int:pk>',houseApi, name="houseApi"),
    path('boutique/info/<int:pk>', boutiquePageInfo , name="boutiquePageInfo"),
    
    #! This For Testing Purposes and for filling DataBase
    path('generate/page/',generatePage, name="generatePage"),
    path('generate/users/<str:username>/<str:email>/<str:password>/<str:city>',generateUsers, name="generateUsers"),
    path('generate/posts/<int:pk>/<str:desc>/<str:cat>/<str:city>/<str:addresse>/<str:title>/<int:price>/<str:transaction>/<str:rooms>/<str:etage>/<str:bedRoom>/<str:toilettes>/<str:living_room>/<str:total_surface>/<str:elevator>/<str:balcony>/<str:air_conditioner>/<str:furnished>/<str:furniture>/<str:Heater>/<str:concierge>/<str:terrace>/<str:cuisine_equipee>/<str:securite>/<str:parking>/',generateHousePosts, name="generateHousePosts"),
    path('solve/profile/prb/',solveProfilePrb, name="solveProfilePrb"),
]