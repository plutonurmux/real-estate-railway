from xml.dom.minidom import Document
from django.conf import settings
from django.contrib import admin
from django.http import HttpResponse
from django.urls import path , include
from django.conf import settings
from django.conf.urls.static import static






urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('authenticationApp.urls')),
    
    path('home/', include('homeApp.urls')),
    path('home/api/', include('homeApi.urls')),
    path('account/', include('profileApp.urls')),
    path('chat/', include('chatSection.urls')),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
