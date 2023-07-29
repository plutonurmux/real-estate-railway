from django.shortcuts import render , redirect
from django.http import HttpResponse
from .models import Conversation , ChatMessage
from django.http import JsonResponse
from operator import itemgetter
from django.contrib.auth.models import User
import json









def getAllConversation(user):
    all_conversation1 = list(Conversation.objects.all().filter(first_person=user))
    all_conversation2 = list(Conversation.objects.all().filter(second_person=user))
    res_1 = []
    res_2 = []

    for conv in all_conversation1:
        last_msg_conv = list(ChatMessage.objects.all().filter(conversation=conv))[-1]
        n_dict = {
            "conv_id" : conv.id,
            "participate_user" : conv.second_person.username,
            "image" : conv.second_person.profileaccount.avatar,
            "last_msg" : last_msg_conv.message,
            "conv_last_update" : str(conv.date_updated),
            "last_msg_date" : str(conv.date_updated.strftime("%X")),
        }
        res_1.append(n_dict)

    for conv in all_conversation2:
        last_msg_conv = list(ChatMessage.objects.all().filter(conversation=conv))[-1]
        n_dict = {
            "conv_id" : conv.id,
            "participate_user" : conv.first_person.username,
            "image" : conv.first_person.profileaccount.avatar,
            "last_msg" : last_msg_conv.message,
            "conv_last_update" : str(conv.date_updated),
            "last_msg_date" : str(conv.date_updated.strftime("%X")),
        }
        res_2.append(n_dict)
    #> Final Array Cointain all the conversation for a user
    res = res_1 + res_2
    final_res = sorted(res, key=itemgetter('conv_last_update')) 
    final_res.reverse()
    return final_res





def checkConversationExist(user1,user2):
    conversation_exist1 = Conversation.objects.all().filter(first_person=user1,second_person=user2).count()
    conversation_exist2 = Conversation.objects.all().filter(first_person=user2,second_person=user1).count()

    if (conversation_exist1 == 1 or conversation_exist2 == 2):
        return True
    else:
        return False   




def getChatConversation(user1,user2):
    conversation_exist1 = Conversation.objects.all().filter(first_person=user1,second_person=user2)
    conversation_exist2 = Conversation.objects.all().filter(first_person=user2,second_person=user1)

    if (conversation_exist1.count() == 1):
        return conversation_exist1
    elif (conversation_exist2.count() == 1):
        return conversation_exist2
    else:
        return None        