from apps.bags.models import Institution
from rest_framework import serializers

class InstitutionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institution
        exclude = ('state','created_date','modified_date','deleted_date',)


    