from django.urls import path, include
from .views import CreateRoomView, GetRoom, JoinRoom, RoomView, UpdateRoom

urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('update-room', UpdateRoom.as_view())
]
