from django.shortcuts import render
from django.db.models import Q

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser,\
IsAuthenticated,SAFE_METHODS
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import CustomerSerializer,\
WalletSerializer,CurrencySerializer,\
TransactionSerializer,TransactionAddSerializer,CustomerAddSerializer,\
WalletAddSerializer,CustomerAvatarSerializer,CustomerAvatarAddSerializer

from .models import Customer,Wallet,Currency,Transaction,CustomerAvatar
from .permissions.view_permissions import IsAdminOrReadOnly

import logging

logging.getLogger(__name__)


# Create your views here.

class CustomerViewSet(ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    queryset = Customer.objects.select_related('user').select_related('avatar').all()


    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return CustomerSerializer
        return CustomerAddSerializer

    @action(detail=False,methods=['GET','PUT','PATCH'],permission_classes=[IsAuthenticated])
    def profile(self,request):
        customer = Customer.objects.filter(user=request.user).first()
        if request.method == "GET":
            serializer = CustomerSerializer(customer)
            return Response(serializer.data)
        else:
            serializer = CustomerAddSerializer(customer,data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)

    
class WalletViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return WalletSerializer
        return WalletAddSerializer

    def get_serializer_context(self):
        return {'user':self.request.user}
    
    def get_queryset(self):
        user = self.request.user
        customer = Customer.objects.filter(user=user).first()
        wallets = Wallet.objects.filter(customer=customer)
        return wallets
    

class CurrencyViewSet(ModelViewSet):
    permission_classes = [IsAdminOrReadOnly]
    serializer_class = CurrencySerializer
    queryset = Currency.objects.all()

class TransactionViewSet(ModelViewSet):

    permission_classes=[IsAuthenticated]
    
    def get_serializer_class(self):
        method = self.request.method
        if method in SAFE_METHODS:
            return TransactionSerializer
        elif method in ['PUT','PATCH','POST']:
            return TransactionAddSerializer
    
    def get_serializer_context(self):
        user = self.request.user
        customer = Customer.objects.filter(user=user).first()
        return {'sender_customer':customer}

    # we return transactions that either sender is the current user or receiver is the current user
    def get_queryset(self):
        user = self.request.user
        customer = Customer.objects.filter(user=user).first()
        return Transaction.objects.filter(Q(sender=customer.id) | Q(receiver=customer)).order_by('-created_time')
    
class CustomerAvatarViewSet(ModelViewSet):
    queryset = CustomerAvatar.objects.all()

    permission_classes=[IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return CustomerAvatarSerializer
        return CustomerAvatarAddSerializer

    def get_serializer_context(self):
        customer = Customer.objects.get(user=self.request.user)
        return {'customer':customer}