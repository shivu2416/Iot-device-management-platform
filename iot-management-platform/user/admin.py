from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _

from .models import User 

class UserAdmin(BaseUserAdmin):
    ordering = ['id']
    list_display = ['username', 'email', 'bio', 'role']  

    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        (_('Personal Info'), {'fields': ('first_name','last_name','email', 'bio', 'role')}), 
        (_('Permissions'), {
            'fields': ('is_active', 'is_staff', 'is_superuser'),
        }),
        (_('Important dates'), {'fields': ('last_login',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'password1', 'password2', 'email', 'bio', 'role'),
        }),
    )

    search_fields = ['username', 'email']
    readonly_fields = ['password']

# Register the custom user model with the custom admin
admin.site.register(User, UserAdmin)

