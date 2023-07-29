from django.urls import path
from .views import chatApp , allConversation , conversationMessages , addMessage , addConversation





urlpatterns = [
    path('', chatApp , name="chatApp"),
    path('<int:conv>/', chatApp , name="chatApp"),
    path('addMessage/<int:pk>/<str:msg>', addMessage , name="addMessage"),
    path('conversation/messages/<int:pk>/', conversationMessages , name="conversationMessages"),
    path('conversation/', allConversation , name="allConversation"),
    path('conversation/add/<str:username>/', addConversation , name="addConversation"),
]