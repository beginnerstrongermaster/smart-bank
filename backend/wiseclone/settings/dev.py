from .common import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-f*k*%-e12i(v9^%-*!1esq7qi466#x-xxu+)imsyo7!byniq=g'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'YOURDATABASE',
        'USER': 'YOURUSER',
        'PASSWORD': 'YOURPASSWORD',
        'HOST':'YOURHOST',
        'PORT':'YOURPORT',
    }
}