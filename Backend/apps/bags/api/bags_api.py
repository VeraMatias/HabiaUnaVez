from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from apps.bags.models import Bags

from apps.bags.api.serializers.bags_serializers import BagsSerializer

class BagsViewSet(viewsets.GenericViewSet):
    model = Bags
    serializer_class = BagsSerializer

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
        bag = self.get_queryset()
        bag_serializers = self.serializer_class(bag, many = True)
        return Response(bag_serializers.data, status = status.HTTP_200_OK)
    
    def create(self, request):
        bag_serializer = self.serializer_class(data = request.data)
        if bag_serializer.is_valid():
            bag_serializer.save()
            return Response({'message': 'Bolso cargado correctamente'}, status = status.HTTP_201_CREATED)
        return Response({'message': "Hay errores en el bolso", 'errors': bag_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk = None):
        bag = self.get_object(pk)
        bag_serializer = self.serializer_class(bag)
        return Response(bag_serializer.data)
    
    def update(self, request, pk = None):
        bag = self.get_object(pk)
        bag_serializer = self.serializer_class(bag, data = request.data)
        if bag_serializer.is_valid():
            bag_serializer.save()
            return Response({'message': 'Bolso modificado con exito'}, status = status.HTTP_200_OK)
        return Response({
            'message' : 'Error al intentar modificar el bolso',
            'errors': bag_serializer.errors
        }, status = status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk = None):
        bag_destroy = self.model.objects.filter(pk = pk).update(state = False)
        if bag_destroy == 1:
            return Response({'message': 'Bolso eliminado correctamente'}, status = status.HTTP_200_OK)
        else:
            Response({'message': "Bolso invalido"}, status = status.HTTP_404_NOT_FOUND)

    '''
    --------------PERSONALIZATED VIEWS-------------
    '''

    @action(detail = True, methods= ['POST'], url_path = 'active_bag')
    def active_bag(self, request, pk = None):
        bag_active = self.model.objects.filter(pk = pk).update(state = True)
        if bag_active == 1:
            return Response({'message': 'Bolso habilitado nuevamente'}, status = status.HTTP_200_OK)
        else:
            Response({'message': "Bolso invalido"}, status = status.HTTP_404_NOT_FOUND)