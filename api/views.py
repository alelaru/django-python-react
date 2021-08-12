from django.http.response import Http404
from rest_framework.response import Response
from api.serializers import CreateRoomSerializer, RoomSerializer, UpdateSerializer
from api.models import Room
from django.shortcuts import render
from rest_framework import generics, serializers, status
from rest_framework.views import APIView

# Create your views here.
# def main(request):
#     return HttpResponse("Hello")

# Create an API view

# Get all rooms


class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class UpdateRoom(APIView):
    # You use a serializer class whenever you want to ask for information
    # THIS IS FUCKING IMPORTANT
    serializer_class = UpdateSerializer
    # Normally with patch is the updating

    def patch(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get("guest_can_pause")
            votes_to_skip = serializer.data.get("votes_to_skip")
            code = serializer.data.get("code")

            print("Im Inside")

            queryset = Room.objects.filter(code=code)
            if queryset.exists():
                # return Response({"msg", "Room doesnt exist..."}, status=status.HTTP_404_NOT_FOUND)
                print("It exist and now im editing everything")
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
                # else:
                #     room = Room(host=host, guest_can_pause=guest_can_pause,
                #                 votes_to_skip=votes_to_skip)
                #     room.save()
                #     self.request.session['room_code'] = room.code
                #     return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        return Response({"Bad Request", "Invalid Data..."}, status=status.HTTP_400_BAD_REQUEST)


# Here it takes a room with a code
class GetRoom(APIView):
    serializer_class = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self, request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            room = Room.objects.filter(code=code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found': 'Invalid Room Code'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'Bad Request': 'Code parameter not found in request'}, status=status.HTTP_204_NO_CONTENT)


class JoinRoom(APIView):
    lookup_url_kwarg = 'code'

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        # Get returns none if there is not data there
        code = request.data.get(self.lookup_url_kwarg)

        if code != None:
            room_results = Room.objects.filter(code=code)
            if len(room_results) > 0:
                room = room_results[0]
                return Response({'message': 'Room Joined!!!'}, status=status.HTTP_200_OK)
            return Response({'Bad Request': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'Bad Request': 'Invalid post data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)

# This creates the room with the information


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause,
                            votes_to_skip=votes_to_skip)
                room.save()
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
