from django.db.models.signals import post_save
from django.db.models import Q
from django.dispatch import receiver
from bank.models import Customer,Wallet,Transaction
from django.conf import settings

@receiver(post_save,sender=settings.AUTH_USER_MODEL)
def create_customer_new_user(sender,**kwargs):
    if kwargs['created'] and not kwargs['instance'].is_superuser:
        Customer.objects.create(user=kwargs['instance'])

# DELETE MONEY FROM SENDER AND ADD TO RECEIVER
@receiver(post_save,sender=Transaction)
def minus_sender_wallet_amount_add_to_receiver(sender,**kwargs):
    if kwargs['created']:
        transaction = kwargs['instance']
        sender = transaction.sender
        receiver = transaction.receiver
        currency = transaction.currency
        amount = transaction.amount
        sender_wallet = Wallet.objects.filter(Q(customer=sender)&Q(currency=currency)).first()
        receiver_wallet = Wallet.objects.filter(Q(customer=receiver)&Q(currency=currency)).first()
        sender_wallet.amount -= amount
        sender_wallet.save()
        receiver_wallet.amount += amount
        receiver_wallet.save()