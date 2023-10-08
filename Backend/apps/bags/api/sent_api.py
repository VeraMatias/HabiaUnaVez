from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from apps.bags.models import Sent

from apps.bags.api.serializers.bags_serializers import SentSerializer

class SentViewSet(viewsets.GenericViewSet):
    model = Sent
    serializer_class = SentSerializer

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
        sent = self.get_queryset()
        sent_serializers = self.serializer_class(sent, many = True)
        return Response(sent_serializers.data, status = status.HTTP_200_OK)
    
    def create(self, request):
        sent_serializer = self.serializer_class(data = request.data)
        if sent_serializer.is_valid():
            sent_serializer.save()
            return Response({'message': 'Productos enviados cargado correctamente'}, status = status.HTTP_201_CREATED)
        return Response({'message': "Hay errores en los productos enviados", 'errors': sent_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk = None):
        sent = self.get_object(pk)
        sent_serializer = self.serializer_class(sent)
        return Response(sent_serializer.data)
    
    def update(self, request, pk = None):
        sent = self.get_object(pk)
        sent_serializer = self.serializer_class(sent, data = request.data)
        if sent_serializer.is_valid():
            sent_serializer.save()
            return Response({'message': 'Productos enviados modificados con exito'}, status = status.HTTP_200_OK)
        return Response({
            'message' : 'Error al intentar modificar los productos enviados',
            'errors': sent_serializer.errors
        }, status = status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk = None):
        sent_destroy = self.model.objects.filter(pk = pk).update(state = False)
        if sent_destroy == 1:
            return Response({'message': 'Productos enviados eliminados correctamente'}, status = status.HTTP_200_OK)
        else:
            Response({'message': "Productos enviados invalidos"}, status = status.HTTP_404_NOT_FOUND)

    '''
    --------------PERSONALIZATED VIEWS-------------
    '''

    @action(detail = True, methods= ['POST'], url_path = 'active_sent')
    def active_sent(self, request, pk = None):
        sent_active = self.model.objects.filter(pk = pk).update(state = True)
        if sent_active == 1:
            return Response({'message': 'Productos enviados habilitados nuevamente'}, status = status.HTTP_200_OK)
        else:
            Response({'message': "Productos enviados invalidos"}, status = status.HTTP_404_NOT_FOUND)