from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewset
from .views import UserViewset, UserRegisterationAPIView, UserLoginAPIView



router = DefaultRouter()
router.register(r'users', UserViewset, basename='user')



urlpatterns = [
    path('', include(router.urls)),
    path('sign-up/', UserRegisterationAPIView.as_view(), name='user-sign-up'),
    path('login/', UserLoginAPIView.as_view(), name='login')
]
