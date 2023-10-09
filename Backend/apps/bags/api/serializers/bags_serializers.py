from apps.bags.models import Institution, Sent, Received, Not_received, Bags
from rest_framework import serializers

class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        exclude = ('state','created_date','modified_date','deleted_date',)

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

class NotReceivedSerializer(serializers.ModelSerializer):

    class Meta:
        model = Not_received
        exclude = ('state','created_date','modified_date','deleted_date',)