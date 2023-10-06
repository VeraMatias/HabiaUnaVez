from rest_framework.routers import DefaultRouter
from apps.products.api.product_api import ProductViewSet
from apps.products.api.supplier_api import SupplierViewSet


router = DefaultRouter()

router.register('product',ProductViewSet, basename= 'products'),
router.register('supplier',SupplierViewSet, basename= 'supplier')

urlpatterns = router.urls
