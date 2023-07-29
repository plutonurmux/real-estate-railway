from django.shortcuts import render , redirect
from django.http import HttpResponse
from .models import Conversation , ChatMessage
from django.http import JsonResponse
from operator import itemgetter
from django.contrib.auth.models import User
import json
from .functions_help import *
from .decorators import *
from django.contrib.auth.decorators import login_required




#*/> End Point For Rendring Chat App Page
@login_required
def chatApp(request,conv=None):
    user = request.user
    if (conv is not None):
        conversation_exist = Conversation.objects.filter(id=conv).exists()
        if (conversation_exist ==  True):
            conversation = Conversation.objects.get(id=conv)
            conversation_usr_one = conversation.first_person
            conversation_usr_two = conversation.second_person
            if (user == conversation_usr_one or user == conversation_usr_two):
                if (user == conversation.first_person):
                    participate_user = conversation.second_person
                if (user == conversation.second_person):
                    participate_user = conversation.first_person
                n_dict = {
                    "conv_id" : conversation.id,
                    "participate_user" : participate_user.username,
                    "image" : participate_user.profileaccount.avatar,
                    "last_msg_date" : str(conversation.date_updated.strftime("%X")),
                }
                dataJSON = json.dumps(n_dict)
                context = {"data":dataJSON,"conversation_length":1}
                return render(request,"chatPage.html",context)
            else:
                return redirect("chatApp")  
        else:
            return redirect("chatApp")          
    else:
        if (len(getAllConversation(user)) > 0):
            conversation = getAllConversation(user)[0]
            dataJSON = json.dumps(conversation)
            context = {"data":dataJSON,"conversation_length":len(getAllConversation(user))}
            return render(request,"chatPage.html",context)
        else:
            conversation = getAllConversation(user)
            dataJSON = json.dumps(conversation)
            context = {"data":dataJSON,"conversation_length":0}
            return render(request,"chatPage.html",context)    




#*/> End Point For Fetching All The Conversations
@login_required
def allConversation(request):
    user = request.user
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
            "conv_last_update" : conv.date_updated,
            "last_msg_date" : conv.date_updated.strftime("%X"),
        }
        res_1.append(n_dict)
    for conv in all_conversation2:
        last_msg_conv = list(ChatMessage.objects.all().filter(conversation=conv))[-1]
        n_dict = {
            "conv_id" : conv.id,
            "participate_user" : conv.first_person.username,
            "image" : conv.first_person.profileaccount.avatar,
            "last_msg" : last_msg_conv.message,
            "conv_last_update" : conv.date_updated,
            "last_msg_date" : conv.date_updated.strftime("%X"),
        }
        res_2.append(n_dict)
    #> Final Array Cointain all the conversation for a user
    res = res_1 + res_2
    final_res = sorted(res, key=itemgetter('conv_last_update')) 
    final_res.reverse()
    return JsonResponse(final_res,safe=False)   




#*/> End Point For Fetching Messages For Particular Chat Room
@login_required
@conversationExits
@allowedViewConversation
def conversationMessages(request,pk):
    user_req = request.user
    conversation = Conversation.objects.get(id=pk)
    allMessages =  ChatMessage.objects.all().filter(conversation=conversation)
    res_1 = []
    for msg in allMessages:
        my_msg = (user_req == msg.user)
        n_dict = {
            "id_conv" : conversation.id,
            "my_msg" : my_msg,
            "user_owner" : str(msg.user),
            "content" : msg.message,
        }
        res_1.append(n_dict)
    res_2 = []
    user_one = conversation.first_person
    user_two = conversation.second_person
    if (user_one != user_req):
        user_avatar = user_one.profileaccount.avatar
        print(user_one)
    elif (user_two != user_req):
        user_avatar = user_two.profileaccount.avatar
    res_2.append(user_avatar)
    final_res = [res_1,res_2]
    return JsonResponse(final_res,safe=False)  




#*/> End Point Adding New Message
@login_required
@conversationExits
@allowedViewConversation
def addMessage(request,pk,msg):
    user = request.user
    conversation = Conversation.objects.get(id=pk)
    message = ChatMessage.objects.create(user=user,message=msg,conversation=conversation)
    return HttpResponse("Message Created Succefully")




#*/> End Point For Creating New Chat Room
@login_required
def addConversation(request,username):
    my_user = request.user
    second_user = User.objects.get(username=username)
    if (my_user == second_user):
        return redirect("chatApp")
    else:
        conversation_exist = checkConversationExist(my_user,second_user)
        if (conversation_exist == False):
            new_conversation = Conversation.objects.create(first_person=my_user,second_person=second_user)
            return redirect("chatApp")
        return redirect("chatApp")