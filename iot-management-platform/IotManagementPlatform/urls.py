from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views

from .swagger import urlpatterns as swagger_urls
urlpatterns = [
    path('admin/', admin.site.urls),
    path("user/", include("user.urls")),
    path("device/", include("device_management.urls")),
    
    #JWT 
    path('token/', jwt_views.TokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh'),
    
] + swagger_urls
