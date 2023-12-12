from rest_framework.permissions import IsAuthenticated

from IotManagementPlatform.permissions import DeviceActionPermission, DeviceDataActionPermission
from . models import Device, DeviceData
from .serializers import DeviceSerializer, DeviceDataSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync



class DeviceViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, DeviceActionPermission]
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer

    
class DeviceDataViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, DeviceDataActionPermission]

    queryset = DeviceData.objects.all()
    serializer_class = DeviceDataSerializer
    
    def retrieve(self, request, *args, **kwargs):
        device_id = kwargs.get('pk')
        instance = DeviceData.objects.filter(device_id=device_id)
        result = [self.get_serializer(i).data for i in instance]
        return Response(result)
    



def update_device_status(device_id, new_status):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"device_{device_id}",
        {
            "type": "device.status",
            "message": {"status": new_status},
        },
    )