from apps.products.models import Product
from rest_framework import serializers

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        exclude = ('state','created_date','modified_date','deleted_date',)

    def validate(self,data):
        if 'category_product'  not in data.keys():
            raise serializers.ValidationError('Debe ingresar una categoria de producto')
        
        if 'supplier'  not in data.keys():
            raise serializers.ValidationError('Debe ingresar un proveedor')
        
        if len(str(data['code'])) < 6:
            raise serializers.ValidationError('Debe ingresar un codigo de 6 digitos')
        return data
        
    # def to_representation(self, instance):
    #     return {
    #         'code': instance.code,
    #         'quantity': instance.quantity,
    #         'cost': instance.cost,
    #         'price': instance.price,
    #         'description': instance.description,
    #         'category_product': instance.category_product.name if instance.category_product is not None else '',
    #         'image': instance.image.url if instance.image != '' else "",
    #         'supplier': instance.supplier.name if instance.supplier is not None else ''
    #     }