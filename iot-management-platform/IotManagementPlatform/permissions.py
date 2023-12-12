from rest_framework import permissions

class DeviceActionPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return False

        if request.user.role == 'operator':
            return request.method in permissions.SAFE_METHODS
        elif request.user.role == 'engineer':
            return request.method in ['POST','PUT', 'PATCH', 'GET']
        elif request.user.role in ['manager', 'owner']:
            # Manager and owner have all permissions
            return True

        return False
    
    
class DeviceDataActionPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated
        if not request.user.is_authenticated:
            return False

        if request.user.role == 'operator':
            return request.method in  ['POST','PUT', 'PATCH', 'GET']
        elif request.user.role == 'engineer':
            return request.method in permissions.SAFE_METHODS
        elif request.user.role in ['manager', 'owner']:
            # Manager and owner have all permissions
            return True

        return False