from django.http import HttpResponse
from django.shortcuts import render , redirect
from django.contrib.auth.models import User
from .models import Conversation , ChatMessage





def conversationExits(view_func):
    def inside(request,*args,**kwargs):
        try:
            conversation_id = kwargs["pk"]
            conversation_exist = Conversation.objects.filter(id=conversation_id).exists()
            if (conversation_exist ==  True):
                return view_func(request,*args,**kwargs)
            else:
                return HttpResponse("Conversation Doesn't Exist")
        except:
            return HttpResponse("Conversation Doesn't Exist")
    return inside





def allowedViewConversation(view_func):
    def inside(request,*args,**kwargs):
        my_user = request.user
        conversation_id = kwargs["pk"]
        conversation = Conversation.objects.get(id=conversation_id)
        conversation_usr_one = conversation.first_person
        conversation_usr_two = conversation.second_person

        if (my_user == conversation_usr_one or my_user == conversation_usr_two):
            return view_func(request,*args,**kwargs)
        else:
            return HttpResponse("You are not allowed to acess this data")
    return inside