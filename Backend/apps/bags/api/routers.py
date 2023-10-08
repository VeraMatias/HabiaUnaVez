from rest_framework.routers import DefaultRouter
from apps.bags.api.institution_api import InstitutionViewSet
from apps.bags.api.sent_api import SentViewSet



router = DefaultRouter()

router.register('institution', InstitutionViewSet, basename= 'institution')
router.register('sent', SentViewSet, basename= 'institution')

urlpatterns = router.urls
