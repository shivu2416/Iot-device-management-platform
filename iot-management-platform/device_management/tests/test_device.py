from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
from user.models import User
from django.urls import reverse
from device_management.models import Device
import datetime
from datetime import datetime, timezone



class DeviceModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='testuser', password='testpassword')

    def test_device_creation(self):
        device = Device.objects.create(
            name='Test Device',
            user=self.user,
            serial_number='123456',
            manufacturer='Test Manufacturer',
            is_active=True
        )

        self.assertEqual(device.name, 'Test Device')
        self.assertEqual(device.user, self.user)
        self.assertEqual(device.serial_number, '123456')
        self.assertEqual(device.manufacturer, 'Test Manufacturer')
        self.assertTrue(device.is_active)

    def test_device_str_method(self):
        device = Device.objects.create(
            name='Test Device',
            user=self.user,
            serial_number='123456',
            manufacturer='Test Manufacturer',
            purchase_date='2023-01-01',
            is_active=True
        )

        expected_str = 'Test Device'
        self.assertEqual(str(device), expected_str)

class DeviceViewSetTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_operator = User.objects.create(username='operator', password='testpassword', role='operator')
        self.user_engineer = User.objects.create(username='engineer', password='testpassword', role='engineer')
        self.user_manager = User.objects.create(username='manager', password='testpassword', role='manager')
        self.user_owner = User.objects.create(username='owner', password='testpassword', role='owner')

        # Create devices for testing
        self.device1 = Device.objects.create(name='Device1', user=self.user_operator, serial_number='123', manufacturer='ABC')
        self.device2 = Device.objects.create(name='Device2', user=self.user_engineer, serial_number='456', manufacturer='XYZ')

    def get_jwt_token(self, user):
        from rest_framework_simplejwt.tokens import RefreshToken
        refresh = RefreshToken.for_user(user)
        return str(refresh.access_token)

    def test_operator_can_read_devices(self):
        token = self.get_jwt_token(self.user_operator)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        response = self.client.get(reverse('device-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_operator_cannot_create_device(self):
        token = self.get_jwt_token(self.user_operator)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        response = self.client.post(reverse('device-list'), {'name': 'New Device', 'serial_number': '789', 'manufacturer': 'XYZ'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_engineer_can_create_and_read_devices(self):
        
        token = self.get_jwt_token(self.user_engineer)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        # Test create device
        response = self.client.post(reverse('device-list'), {'name': 'New Device', 'user':self.user_engineer.id,'serial_number': '789', 'manufacturer': 'XYZ'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Test read devices
        response = self.client.get(reverse('device-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_manager_can_create_and_read_devices(self):
        token = self.get_jwt_token(self.user_manager)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        # Test create device
        response = self.client.post(reverse('device-list'), {'name': 'New Device', 'user':self.user_engineer.id,'serial_number': '789', 'manufacturer': 'XYZ'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Test read devices
        response = self.client.get(reverse('device-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_owner_can_create_and_read_devices(self):
        token = self.get_jwt_token(self.user_owner)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        # Test create device
        response = self.client.post(reverse('device-list'), {'name': 'New Device', 'user':self.user_engineer.id,'serial_number': '789', 'manufacturer': 'XYZ'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # Test read devices
        response = self.client.get(reverse('device-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unauthenticated_user_cannot_access_devices(self):
        # Unauthenticate the user
        self.client.credentials()

        # Test any method for an unauthenticated user
        response = self.client.get(reverse('device-list'))
        
    def test_engineer_can_update_device(self):
        token = self.get_jwt_token(self.user_engineer)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        # Test update device
        response = self.client.put(reverse('device-detail', args=[self.device2.id]), {'name': 'Updated Device', 'user':self.user_engineer.id, 'serial_number': '789', 'manufacturer': 'XYZ'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_manager_can_update_device(self):
        token = self.get_jwt_token(self.user_manager)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        # Test update device
        response = self.client.put(reverse('device-detail', args=[self.device2.id]), {'name': 'Updated Device', 'user':self.user_engineer.id, 'serial_number': '789', 'manufacturer': 'XYZ'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_owner_can_update_device(self):
        token = self.get_jwt_token(self.user_owner)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        # Test update device
        response = self.client.put(reverse('device-detail', args=[self.device2.id]), {'name': 'Updated Device', 'user':self.user_engineer.id, 'serial_number': '789', 'manufacturer': 'XYZ'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_engineer_can_partial_update_device(self):
        token = self.get_jwt_token(self.user_engineer)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        # Test partial update device
        response = self.client.patch(reverse('device-detail', args=[self.device2.id]), {'name': 'Updated Device'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_manager_can_partial_update_device(self):
        token = self.get_jwt_token(self.user_manager)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        # Test partial update device
        response = self.client.patch(reverse('device-detail', args=[self.device2.id]), {'name': 'Updated Device'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_owner_can_partial_update_device(self):
        token = self.get_jwt_token(self.user_owner)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        # Test partial update device
        response = self.client.patch(reverse('device-detail', args=[self.device2.id]), {'name': 'Updated Device'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
