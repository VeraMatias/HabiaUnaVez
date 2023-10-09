from rest_framework.routers import DefaultRouter
from apps.bags.api.institution_api import InstitutionViewSet
from apps.bags.api.sent_api import SentViewSet
from apps.bags.api.received_api import ReceivedViewSet
from apps.bags.api.not_received_api import NotReceivedViewSet



router = DefaultRouter()

router.register('institution', InstitutionViewSet, basename= 'institution')
router.register('sent', SentViewSet, basename= 'sent')
router.register('received', ReceivedViewSet, basename= 'received')
router.register('not_received', NotReceivedViewSet, basename= 'not_received')

urlpatterns = router.urls
