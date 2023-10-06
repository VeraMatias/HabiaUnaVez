from rest_framework.routers import DefaultRouter
from apps.products.api.product_api import ProductViewSet
from apps.products.api.supplier_api import SupplierViewSet
from apps.products.api.category_product_api import CategoryProductViewSet


router = DefaultRouter()

router.register('product',ProductViewSet, basename= 'products')
router.register('supplier',SupplierViewSet, basename= 'supplier')
router.register('category_product',CategoryProductViewSet, basename= 'category_product')

urlpatterns = router.urls
