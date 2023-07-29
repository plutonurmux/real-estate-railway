"""
WSGI config for auth project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'auth.settings')

application = get_wsgi_application()
# 
application = WhiteNoise(application, root='path/to/static/files')
application.add_files('path/to/static/files', prefix='more-static/')