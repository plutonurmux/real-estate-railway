from django.db import models
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save , pre_save
from django.dispatch import receiver
from django.db.models.signals import post_save , pre_save





# Create your models here.
class Conversation(models.Model):
    first_person = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='Conversation_first_person')
    second_person = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='Conversation_Second_person')
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        res = "Updated at " + str(self.date_updated.strftime("%X")) 
        return res





class ChatMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField(null=False,blank=False)
    conversation = models.ForeignKey(Conversation, null=True, blank=True, on_delete=models.CASCADE, related_name='chatmessage_thread')
    date_created = models.DateTimeField(auto_now=True)
    def __str__(self):
        res_name = "Message From " + str(self.user) + " in room " + str(self.conversation)
        return res_name

#> This For Updating conversation when message has been saved
def updateConversation(sender,instance,created,**kwargs):
    if created:
        conversation = instance.conversation
        conversation.save()
post_save.connect(updateConversation,sender=ChatMessage)        

#> This For Creating new message When conversation created
def createDefaultMessage(sender,instance,created,**kwargs):
    if created:
        my_user = instance.first_person
        message = ChatMessage.objects.create(user=my_user,message="Hello, How are you Doing?",conversation=instance)
post_save.connect(createDefaultMessage,sender=Conversation)    