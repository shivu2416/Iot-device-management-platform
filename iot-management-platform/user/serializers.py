from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import User



class UserRegisterationSerializer(serializers.ModelSerializer):
    """
    Serializer class to serialize registration requests and create a new user.
    """

    class Meta:
        model = User
        fields = ['id','username','password','first_name','last_name','email','role']
        extra_kwargs = {"password": {"write_only": True}, 'id': {"read_only": True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
        
    
class UserLoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['user'] = UserRegisterationSerializer(self.user).data  
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        return data



class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ['id', 'username','password','first_name','last_name','email','date_joined', 'role']
        extra_kwargs = {'password': {'write_only': True, 'required': False}}
        
    