from apps.products.models import CategoryProduct, Supplier
from rest_framework import serializers

class CategoryProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryProduct
        exclude = ('state','created_date','modified_date','deleted_date',)

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        exclude = ('state','created_date','modified_date','deleted_date',)
    