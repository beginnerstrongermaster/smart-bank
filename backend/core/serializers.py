from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from djoser.serializers import UserSerializer as BaseCurrentUserSerializer


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields = ['username','email','password','phone']

class CurrentUserSerializer(BaseCurrentUserSerializer):
    class Meta(BaseCurrentUserSerializer.Meta):
        fields = ['username','email','phone','first_name','last_name']