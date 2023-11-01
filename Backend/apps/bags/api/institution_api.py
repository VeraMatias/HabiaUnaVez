from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from apps.bags.models import Institution

from apps.bags.api.serializers.bags_serializers import InstitutionSerializer

class InstitutionViewSet(viewsets.GenericViewSet):
    model = Institution
    serializer_class = InstitutionSerializer

    '''
    --------------GET METHODS-------------
    '''
    def get_object(self, pk):
        return get_object_or_404(self.model, pk = pk)
    
    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.filter(state = True)
        return self.queryset

    '''
    --------------CRUD VIEWS-------------
    '''
    def list(self, request):
        institution = self.get_queryset()
        institution_serializers = self.serializer_class(institution, many = True)
        return Response(institution_serializers.data, status = status.HTTP_200_OK)
    
    def create(self, request):
        institution_serializer = self.serializer_class(data = request.data)
        if institution_serializer.is_valid():
            institution_serializer.save()
            return Response({'message': 'Instituto cargado correctamente'}, status = status.HTTP_201_CREATED)
        return Response({'message': "Hay errores en el instituto", 'errors': institution_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk = None):
        institution = self.get_object(pk)
        institution_serializer = self.serializer_class(institution)
        return Response(institution_serializer.data)
    
    def update(self, request, pk = None):
        institution = self.get_object(pk)
        institution_serializer = self.serializer_class(institution, data = request.data)
        if institution_serializer.is_valid():
            institution_serializer.save()
            return Response({'message': 'Instituto modificado con exito'}, status = status.HTTP_200_OK)
        return Response({
            'message' : 'Error al intentar modificar el instituto',
            'errors': institution_serializer.errors
        }, status = status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk = None):
        institution_destroy = self.model.objects.filter(pk = pk).update(state = False)
        if institution_destroy == 1:
            return Response({'message': 'Instituto eliminado correctamente'}, status = status.HTTP_200_OK)
        else:
            Response({'message': "Instituto invalida"}, status = status.HTTP_404_NOT_FOUND)

    '''
    --------------PERSONALIZATED VIEWS-------------
    '''

    @action(detail = True, methods= ['POST'], url_path = 'active_institution')
    def active_institution(self, request, pk = None):
        institution_active = self.model.objects.filter(pk = pk).update(state = True)
        if institution_active == 1:
            return Response({'message': 'Instituto habilitado nuevamente'}, status = status.HTTP_200_OK)
        else:
            Response({'message': "Instituto invalida"}, status = status.HTTP_404_NOT_FOUND)