from django.conf import settings
from django.db import models
from django_countries.fields import CountryField
from uuid import uuid4

# Create your models here.

class Currency(models.Model):
    CURRENCY_CHOICES = {
        ('USD','United States dollar'),
        ('EUR','Euro'),
        ('GBP','British pound sterling'),
        ('JPY','Japanese yen'),
        ('CHF',' Swiss franc'),
        ('CAD','Canadian dollar'),
        ('AUD','Australian dollar')
    }
    code = models.CharField(max_length=255,choices=CURRENCY_CHOICES,unique=True)
    #wallet
    #transaction
    def __str__(self):
        return f'{self.code}'

class Customer(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid4)
    birthday = models.DateField(null=True)
    address = models.CharField(max_length=255,null=True)
    city = models.CharField(max_length=255,null=True)
    postcode = models.CharField(max_length=255,null=True)
    region = CountryField(blank_label="(select country)",null=True)
    user = models.OneToOneField(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='customer')
    #wallet
    #transaction

    def __str__(self):
        return self.user.username

class CustomerAvatar(models.Model):
    customer = models.OneToOneField(Customer,on_delete=models.CASCADE,related_name='avatar')
    avatar = models.ImageField(upload_to='bank/avatars')
    
    def __str__(self):
        return str(self.avatar)

class Transaction(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid4)
    currency = models.ForeignKey(Currency,on_delete=models.DO_NOTHING,related_name='currency')
    sender = models.ForeignKey(Customer,on_delete=models.DO_NOTHING,related_name='transaction_sender')
    receiver = models.ForeignKey(Customer,on_delete=models.DO_NOTHING,related_name='transaction_receiver')
    amount = models.DecimalField(max_digits=50,decimal_places=3)
    created_time = models.DateTimeField(auto_now_add=True)



class Wallet(models.Model):
    id = models.UUIDField(primary_key=True,default=uuid4)
    currency = models.ForeignKey(Currency,on_delete=models.CASCADE,related_name='wallet')
    amount = models.DecimalField(max_digits=50,decimal_places=3)
    customer = models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='wallet')

