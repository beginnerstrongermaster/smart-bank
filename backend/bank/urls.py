from django.urls import path, include
from rest_framework_nested import routers
from .views import CustomerViewSet,WalletViewSet,CurrencyViewSet,TransactionViewSet,CustomerAvatarViewSet

router = routers.DefaultRouter()
router.register('customers',CustomerViewSet,basename='customers')
router.register('wallets',WalletViewSet,basename='wallets')
router.register('currencies',CurrencyViewSet,basename='currencies')
router.register('transactions',TransactionViewSet,basename='transactions')
router.register('avatars',CustomerAvatarViewSet,basename='avatars')
urlpatterns = [
    path('',include(router.urls)),
]
