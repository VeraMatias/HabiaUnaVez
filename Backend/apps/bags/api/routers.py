from rest_framework.routers import DefaultRouter
from apps.bags.api.institution_api import InstitutionViewSet
from apps.bags.api.sent_api import SentViewSet
from apps.bags.api.productsent_api import ProductSentViewSet
from apps.bags.api.received_api import ReceivedViewSet
from apps.bags.api.not_received_api import NotReceivedViewSet
from apps.bags.api.bags_api import BagsViewSet



router = DefaultRouter()

router.register('institution', InstitutionViewSet, basename= 'institution')
router.register('sent', SentViewSet, basename= 'sent')
router.register('product_sent', ProductSentViewSet, basename= 'relation_sentsent')
router.register('received', ReceivedViewSet, basename= 'received')
router.register('not_received', NotReceivedViewSet, basename= 'not_received')
router.register('bag', BagsViewSet, basename= 'bags')

urlpatterns = router.urls
