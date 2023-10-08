from rest_framework.routers import DefaultRouter
from apps.bags.api.institution_api import InstitutionViewSet



router = DefaultRouter()

router.register('institution',InstitutionViewSet, basename= 'institution')


urlpatterns = router.urls
