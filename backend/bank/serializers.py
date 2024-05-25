from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from .models import Customer, Wallet,Currency,Transaction,CustomerAvatar
from django.db import IntegrityError
from django.db.models import Q 
from django_countries.serializer_fields import CountryField

# This is for Customer view
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id','birthday','address','city','region','postcode','email','phone','username','fullname','avatar','first_name','last_name']
    region = CountryField()
    email = serializers.SerializerMethodField(method_name='get_customer_email')
    phone = serializers.SerializerMethodField(method_name='get_customer_phone')
    username = serializers.SerializerMethodField(method_name='get_customer_username')
    fullname = serializers.SerializerMethodField(method_name='get_customer_fullname')
    first_name = serializers.SerializerMethodField(method_name='get_customer_first_name')
    last_name = serializers.SerializerMethodField(method_name='get_customer_last_name')
    avatar = serializers.StringRelatedField()

    def get_customer_email(self,customer):
        return customer.user.email
    
    def get_customer_phone(self,customer):
        return customer.user.phone

    def get_customer_username(self,customer):
        return customer.user.username
    
    def get_customer_fullname(self,customer:Customer):
        return f'{customer.user.first_name} {customer.user.last_name}'
    
    def get_customer_first_name(self,customer:Customer):
        return f'{customer.user.first_name}'

    def get_customer_last_name(self,customer:Customer):
        return f'{customer.user.last_name}'

# This is for Customer addation
class CustomerAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['birthday','address','city','region','postcode']
    region = CountryField()

class CustomerTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['username','avatar']
    username = serializers.SerializerMethodField(method_name='get_customer_username')
    avatar = serializers.StringRelatedField()

    def get_customer_username(self,customer):
        return customer.user.username

class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model =Wallet
        fields = ['id','currency','amount','customer']
    
    currency = serializers.StringRelatedField()
    customer = serializers.StringRelatedField()
    

class WalletAddSerializer(serializers.ModelSerializer):
    class Meta:
        model =Wallet
        fields = ['currency','amount']

    
    def save(self, **kwargs):
        user = self.context['user']
        customer = user.customer
        wallet = Wallet.objects.filter(Q(customer=customer)&Q(currency=self.validated_data['currency'])).first()
        if not wallet:
            wallet = Wallet.objects.create(**self.validated_data,customer=customer)
        else:
            wallet.amount += self.validated_data['amount']
            wallet = wallet.save()
        return wallet

class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ['id','code']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id','sender','receiver','currency','amount']
    
    sender = CustomerTransactionSerializer()
    receiver = CustomerTransactionSerializer()
    currency = serializers.StringRelatedField()

class TransactionAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['receiver','currency','amount']

    # Check whether the sender has the wallet that has the transfer currency and enough money to transfer, as for calculations, leave them to signals
    def create(self, validated_data):
        currency = validated_data['currency']
        transfer_amount = validated_data['amount']
        receiver = validated_data['receiver']
        sender = self.context['sender_customer']
        sender_wallet = sender.wallet.filter(currency=currency).first()
        receiver_wallet = receiver.wallet.filter(currency=currency).first()

        if not sender_wallet:
            raise serializers.ValidationError('You do not have the currency')
        elif not receiver_wallet:
            raise serializers.ValidationError('Receiver does not have the currency')
        elif sender_wallet.amount < transfer_amount:
            raise serializers.ValidationError('You do not have the enough money')
        return Transaction.objects.create(**validated_data,sender=sender)

class CustomerAvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerAvatar
        fields = ['id','avatar','customer']

class CustomerAvatarAddSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerAvatar
        fields = ['id','avatar']
    
    def save(self, **kwargs):
        customer = self.context["customer"]
        customer_avatar = CustomerAvatar.objects.filter(customer=customer)
        if customer_avatar:
            customer_avatar.delete()
            customer_avatar = CustomerAvatar.objects.create(**self.validated_data,customer=customer)
            print(customer_avatar)
        else:
            customer_avatar = CustomerAvatar.objects.create(**self.validated_data,customer=customer)
            print(customer_avatar)
        return customer_avatar