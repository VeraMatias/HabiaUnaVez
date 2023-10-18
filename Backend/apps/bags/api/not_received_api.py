from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from apps.bags.models import NotReceived

from apps.bags.api.serializers.bags_serializers import NotReceivedSerializer

class NotReceivedViewSet(viewsets.GenericViewSet):
    model = NotReceived
    serializer_class = NotReceivedSerializer

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
        not_received = self.get_queryset()
        not_received_serializers = self.serializer_class(not_received, many = True)
        return Response(not_received_serializers.data, status = status.HTTP_200_OK)
    
    def create(self, request):
        not_received_serializer = self.serializer_class(data = request.data)
        if not_received_serializer.is_valid():
            not_received_serializer.save()
            return Response({'message': 'Productos no recibidos cargado correctamente'}, status = status.HTTP_201_CREATED)
        return Response({'message': "Hay errores en los productos no recibidos", 'errors': not_received_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk = None):
        not_received = self.get_object(pk)
        not_received_serializer = self.serializer_class(not_received)
        return Response(not_received_serializer.data)
    
    def update(self, request, pk = None):
        not_received = self.get_object(pk)
        not_received_serializer = self.serializer_class(not_received, data = request.data)
        if not_received_serializer.is_valid():
            not_received_serializer.save()
            return Response({'message': 'Productos no recibidos modificados con exito'}, status = status.HTTP_200_OK)
        return Response({
            'message' : 'Error al intentar modificar los productos no recibidos',
            'errors': not_received_serializer.errors
        }, status = status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk = None):
        not_received_destroy = self.model.objects.filter(pk = pk).update(state = False)
        if not_received_destroy == 1:
            return Response({'message': 'Productos no recibidos eliminados correctamente'}, status = status.HTTP_200_OK)
        else:
            Response({'message': "Productos no recibidos invalidos"}, status = status.HTTP_404_NOT_FOUND)

    '''
    --------------PERSONALIZATED VIEWS-------------
    '''

    @action(detail = True, methods= ['POST'], url_path = 'active_not_received')
    def active_not_received(self, request, pk = None):
        not_received_active = self.model.objects.filter(pk = pk).update(state = True)
        if not_received_active == 1:
            return Response({'message': 'Productos no recibidos habilitados nuevamente'}, status = status.HTTP_200_OK)
        else:
            Response({'message': "Productos no recibidos invalidos"}, status = status.HTTP_404_NOT_FOUND)

