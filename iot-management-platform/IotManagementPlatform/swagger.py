from django.conf import settings
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from django.urls import path, include

schema_view = get_schema_view(
    openapi.Info(
        title="Ustawi",
        default_version='v1',
        description="Endpoints",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
)

urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]