from django.contrib import admin
from .models import ProfileAccount , InboxMessages


# Register your models here.
admin.site.register(ProfileAccount)
admin.site.register(InboxMessages)