from apps.products.models import CategoryProduct, Supplier, Product
from rest_framework import serializers

class CategoryProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryProduct
        exclude = ('state','created_date','modified_date','deleted_date',)
    
    def to_representation(self, instance):
        return {
            'id': instance.id,
            'name': instance.name,
            'product_quantity': len(Product.objects.filter(category_product = instance.id))
        }

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        exclude = ('state','created_date','modified_date','deleted_date',)

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'name': instance.name,
            'product_quantity': len(Product.objects.filter(supplier = instance.id)),
            'url': instance.url,
            'armhole': instance.armhole
        }
    