from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from apps.bags.models import Received, Bags

from apps.bags.api.serializers.bags_serializers import ReceivedSerializer, ExistReceivedSerializer

class ReceivedViewSet(viewsets.GenericViewSet):
    model = Received
    serializer_class = ReceivedSerializer
    exist_serializer = ExistReceivedSerializer

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
        received = self.get_queryset()
        received_serializers = self.serializer_class(received, many = True)
        return Response(received_serializers.data, status = status.HTTP_200_OK)
    
    def create(self, request):
        received_serializer = self.serializer_class(data = request.data)
        if received_serializer.is_valid():
            received_serializer.save()
            return Response({'message': 'Productos recibidos cargado correctamente'}, status = status.HTTP_201_CREATED)
        return Response({'message': "Hay errores en los productos recibidos", 'errors': received_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk = None):
        received = self.get_object(pk)
        received_serializer = self.serializer_class(received)
        return Response(received_serializer.data)
    
    def update(self, request, pk = None):
        received = self.get_object(pk)
        received_serializer = self.serializer_class(received, data = request.data)
        if received_serializer.is_valid():
            received_serializer.save()
            return Response({'message': 'Productos recibidos modificados con exito'}, status = status.HTTP_200_OK)
        return Response({
            'message' : 'Error al intentar modificar los productos recibidos',
            'errors': received_serializer.errors
        }, status = status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk = None):
        received_destroy = self.model.objects.filter(pk = pk).update(state = False)
        if received_destroy == 1:
            return Response({'message': 'Productos recibidos eliminados correctamente'}, status = status.HTTP_200_OK)
        else:
            Response({'message': "Productos recibidos invalidos"}, status = status.HTTP_404_NOT_FOUND)

    '''
    --------------PERSONALIZATED VIEWS-------------
    '''

    @action(detail = True, methods= ['POST'], url_path = 'active_received')
    def active_received(self, request, pk = None):
        received_active = self.model.objects.filter(pk = pk).update(state = True)
        if received_active == 1:
            return Response({'message': 'Productos recibidos habilitados nuevamente'}, status = status.HTTP_200_OK)
        else:
            Response({'message': "Productos recibidos invalidos"}, status = status.HTTP_404_NOT_FOUND)

