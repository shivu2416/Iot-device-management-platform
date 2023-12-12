from django.urls import path
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DeviceViewSet, DeviceDataViewSet

router = DefaultRouter()
router.register(r'device', DeviceViewSet, basename='device')
router.register(r'device-data',DeviceDataViewSet, basename='device-telemetry')

urlpatterns = [
    path('', include(router.urls)),
]