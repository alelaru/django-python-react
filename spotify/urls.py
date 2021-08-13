from spotify.views import AuthURL
from django.urls import path, include

urlpatterns = [
    path('get-auth-url', AuthURL.as_view()),
]
