from django.test import TestCase
from django.utils import timezone
from device_management.models import DeviceData, Device
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from user.models import User


class DeviceDataModelTest(TestCase):
    databases = '__all__' 

    def setUp(self):
        self.user = User.objects.create(username='test', password='testpassword', role='operator')
        self.device = Device.objects.create(name='Test Device', user_id=self.user.id, serial_number='123', manufacturer='ABC')

    def test_device_data_creation(self):
        device_data = DeviceData.objects.create(
            device_id=self.device.id,
            timestamp=timezone.now(),
            temperature=25.5,
            humidity=50.0,
            value=10.0,
            location='Room 101',
            status=DeviceData.ONLINE,
            battery_level=80
        )

        self.assertEqual(device_data.device_id, self.device.id)
        self.assertIsNotNone(device_data.timestamp)
        self.assertEqual(device_data.temperature, 25.5)
        self.assertEqual(device_data.humidity, 50.0)
        self.assertEqual(device_data.value, 10.0)
        self.assertEqual(device_data.location, 'Room 101')
        self.assertEqual(device_data.status, DeviceData.ONLINE)
        self.assertEqual(device_data.battery_level, 80)

    def test_device_data_str_method(self):
        device_data = DeviceData.objects.create(
            device_id=self.device.id,
            timestamp=timezone.now(),
            temperature=25.5,
            humidity=50.0,
            value=10.0,
            location='Room 101',
            status=DeviceData.ONLINE,
            battery_level=80
        )

        expected_str = f"{self.device} - {device_data.timestamp}"
        self.assertEqual(str(device_data), expected_str)
        

class DeviceDataViewSetTest(TestCase):
    
    databases = '__all__' 
    
    def setUp(self):
        self.client = APIClient()
        self.operator_user = User.objects.create(username='operator', password='testpassword', role='operator')
        self.engineer_user = User.objects.create(username='engineer', password='testpassword', role='engineer')
        self.manager_user = User.objects.create(username='manager', password='testpassword', role='manager')
        self.owner_user = User.objects.create(username='owner', password='testpassword', role='owner')

        self.device = Device.objects.create(name='Test Device', user=self.operator_user, serial_number='123', manufacturer='ABC')

        self.device_data1 = DeviceData.objects.create(device_id=self.device.id, timestamp='2023-01-01T12:00:00Z', temperature=25.5, humidity=50.0, value=10.0, location='Room 101', status='online', battery_level=80)
        self.device_data2 = DeviceData.objects.create(device_id=self.device.id, timestamp='2023-01-02T12:00:00Z', temperature=26.0, humidity=48.5, value=12.5, location='Room 102', status='offline', battery_level=75)

    def get_jwt_token(self, user):
        from rest_framework_simplejwt.tokens import RefreshToken
        refresh = RefreshToken.for_user(user)
        return str(refresh.access_token)

    def test_operator_can_access_device_data(self):
        token = self.get_jwt_token(self.operator_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        response = self.client.get(reverse('device-telemetry-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_engineer_can_access_device_data(self):
        token = self.get_jwt_token(self.engineer_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        response = self.client.get(reverse('device-telemetry-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_manager_can_access_device_data(self):
        token = self.get_jwt_token(self.manager_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        response = self.client.get(reverse('device-telemetry-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_owner_can_access_device_data(self):
        token = self.get_jwt_token(self.owner_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        response = self.client.get(reverse('device-telemetry-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_operator_can_create_device_data(self):
        token = self.get_jwt_token(self.operator_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        data = {
            'device_id': self.device.id,
            'timestamp': '2023-01-03T12:00:00Z',
            'temperature': 27,
            'humidity': 45,
            'value': 15,
            'location': 'Room 103',
            'battery_level': 85,
        }
        response = self.client.post(reverse('device-telemetry-list'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_engineer_cannot_create_device_data(self):
        token = self.get_jwt_token(self.engineer_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        data = {
            'device_id': self.device.id,
            'timestamp': '2023-01-03T12:00:00Z',
            'temperature': 27,
            'humidity': 45,
            'value': 15,
            'location': 'Room 103',
            'battery_level': 85,
        }

        response = self.client.post(reverse('device-telemetry-list'), data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_manager_can_create_device_data(self):
        token = self.get_jwt_token(self.manager_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        data = {
            'device_id': self.device.id,
            'timestamp': '2023-01-03T12:00:00Z',
            'temperature': 27,
            'humidity': 45,
            'value': 15,
            'location': 'Room 103',
            'battery_level': 85,
        }
        response = self.client.post(reverse('device-telemetry-list'), data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_operator_can_partial_update_device_data(self):
        token = self.get_jwt_token(self.operator_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        data = {
            'temperature': 28,  
            'humidity': 46,     
            'value': 16,        
            'location': 'Room 104',  
            'battery_level': 90,    
        }

        response = self.client.patch(reverse('device-telemetry-detail', args=[self.device_data2.id]), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_manager_can_partial_update_device_data(self):
        token = self.get_jwt_token(self.manager_user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        data = {
            'temperature': 28, 
            'humidity': 46,     
            'value': 16,        
            'location': 'Room 104',  
            'battery_level': 90,
        }

        response = self.client.patch(reverse('device-telemetry-detail', args=[self.device_data2.id]), data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
