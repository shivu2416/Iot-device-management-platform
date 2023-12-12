# your_app/consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from asgiref.sync import async_to_sync
from device_management.models import DeviceData

class DeviceDataConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        device_id = data.get('device_id')
        
        if device_id:
            await self.send_device_data(device_id)

    @database_sync_to_async
    def get_latest_device_data(self, device_id):
        latest_data = DeviceData.objects.filter(device_id=device_id).order_by('-timestamp').first()
        return latest_data

    async def send_device_data(self, device_id):
        latest_data = await self.get_latest_device_data(device_id)
        
        if latest_data:
            await self.send(text_data=json.dumps({
                'timestamp': str(latest_data.timestamp),
                'temperature': latest_data.temperature,
                'humidity': latest_data.humidity,
                'value': latest_data.value,
                'location': latest_data.location,
                'status': latest_data.status,
                'battery_level': latest_data.battery_level,
            }))
