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