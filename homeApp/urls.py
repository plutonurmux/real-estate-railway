from django.urls import path
from .views import homePage , searchPage , house_info_page , createPostPage , editPostPage , deletePostItem



urlpatterns = [
    path('', homePage , name="homePage"),
    path('search/', searchPage , name="searchPage"),
    path('house/<int:pk>/', house_info_page , name="house_info_page"),
    path('add/post', createPostPage , name="createPostPage"),
    path('edit/post/<int:pk>/', editPostPage , name="editPostPage"),
    path('delete/post/<int:pk>/', deletePostItem , name="deletePostItem"),
]