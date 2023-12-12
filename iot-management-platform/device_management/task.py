from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import DeviceData

@receiver(post_save, sender=DeviceData)
def handle_device_data_update(sender, instance, **kwargs):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "device_data",
        {
            "type": "device.status",
            "message": {
                "device_id": instance.device_id,
                "timestamp": str(instance.timestamp),
                "temperature": instance.temperature,
                "humidity": instance.humidity,
                "value": instance.value,
                "location": instance.location,
                "status": instance.status,
                "battery_level": instance.battery_level,
            },
        },
    )