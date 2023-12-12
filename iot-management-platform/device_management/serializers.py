from rest_framework import serializers


from . models import Device, DeviceData


class DeviceSerializer(serializers.ModelSerializer):
    
    class Meta:
        model =  Device
        fields = ['id','name', 'user', 'serial_number', 'manufacturer', 'purchase_date','is_active']
        extra_kwargs = {'id': {"read_only": True}}
        
        
        
class DeviceDataSerializer(serializers.ModelSerializer):
    
    """
    Serializer for the DeviceData model.

    This serializer is used to convert DeviceData model instances to JSON
    representation and vice versa. It inherits from the ModelSerializer provided
    by the Django Rest Framework, making it easy to work with model instances.
    """
    
    
    class Meta:
        model =  DeviceData
        fields = ['id','device_id', 'timestamp', 'temperature','humidity','value', 'location','status', 'battery_level']
        
        
        
    def create(self, validated_data):
        """
        Serializer for creating and updating DeviceData instances.

        This serializer includes custom logic in the create method to check if the
        provided device_id is associated with a valid Device. If the device_id is
        valid, the DeviceData instance is created. Otherwise, a validation error is raised.
        """
        device_id = validated_data.get('device_id')
        device_obj = Device.objects.using("default").filter(
            id = device_id
            )
        if device_obj:
            return super().create(validated_data)
        else:
            raise serializers.ValidationError("device_id is not valid")