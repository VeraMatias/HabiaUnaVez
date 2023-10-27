from apps.bags.models import Institution, Sent, Received, NotReceived, Bags, ProductSent, ProductReceived, ProductNotReceived
from rest_framework import serializers

class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        exclude = ('state','created_date','modified_date','deleted_date',)

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'name': instance.name,
            'bag_quantity': len(Bags.objects.filter(institution = instance.id))
        }

class SentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sent
        exclude = ('state','created_date','modified_date','deleted_date',)

class ReceivedSerializer(serializers.ModelSerializer):

    class Meta:
        model = Received
        exclude = ('state','created_date','modified_date','deleted_date',)

class ExistReceivedSerializer(serializers.Serializer):
    bag_id = serializers.IntegerField()
    received_code = serializers.IntegerField()
    received_quantity = serializers.IntegerField()

class NotReceivedSerializer(serializers.ModelSerializer):

    class Meta:
        model = NotReceived
        exclude = ('state','created_date','modified_date','deleted_date',)


class BagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bags
        exclude = ('state','created_date','modified_date','deleted_date',)


class ProductSentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSent
        fields = '__all__'

class ProductReceivedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReceived
        fields = '__all__'

class ProductNotReceivedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductNotReceived
        fields = '__all__'

class MakeNotReceivedSerializer(serializers.Serializer):
    bag_id = serializers.IntegerField()