from rest_framework.routers import DefaultRouter
from apps.bags.api.institution_api import InstitutionViewSet
from apps.bags.api.sent_api import SentViewSet
from apps.bags.api.received_api import ReceivedViewSet



router = DefaultRouter()

router.register('institution', InstitutionViewSet, basename= 'institution')
router.register('sent', SentViewSet, basename= 'sent')
router.register('received', ReceivedViewSet, basename= 'received')

urlpatterns = router.urls
