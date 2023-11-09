from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from apps.products.models import Supplier

from apps.products.api.serializers.general_serializers import SupplierSerializer

class SupplierViewSet(viewsets.GenericViewSet):
    model = Supplier
    serializer_class = SupplierSerializer

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
        supplier = self.get_queryset()
        supplier_serializers = self.serializer_class(supplier, many = True)
        return Response(supplier_serializers.data, status = status.HTTP_200_OK)
    
    def create(self, request):
        supplier_serializer = self.serializer_class(data = request.data)
        if supplier_serializer.is_valid():
            supplier_serializer.save()
            return Response({'message': 'Proovedor cargado correctamente'}, status = status.HTTP_201_CREATED)
        print(supplier_serializer.errors)
        return Response({'message': "Hay errores en el proveedor", 'errors': supplier_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk = None):
        supplier = self.get_object(pk)
        supplier_serializer = self.serializer_class(supplier)
        return Response(supplier_serializer.data)
    
    def update(self, request, pk = None):
        supplier = self.get_object(pk)
        supplier_serializer = self.serializer_class(supplier, data = request.data)
        if supplier_serializer.is_valid():
            supplier_serializer.save()
            return Response({'message': 'Proveedor modificado con exito'}, status = status.HTTP_200_OK)
        return Response({
            'message' : 'Error al intentar modificar el proveedor',
            'errors': supplier_serializer.errors
        }, status = status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk = None):
        supplier_destroy = self.model.objects.filter(pk = pk).update(state = False)
        if supplier_destroy == 1:
            return Response({'message': 'Proveedor eliminado correctamente'}, status = status.HTTP_200_OK)
        else:
            Response({'message': "Proveedor invalido"}, status = status.HTTP_404_NOT_FOUND)

    '''
    --------------PERSONALIZATED VIEWS-------------
    '''

    @action(detail = True, methods= ['POST'], url_path = 'active_supplier')
    def active_supplier(self, request, pk = None):
        supplier_active = self.model.objects.filter(pk = pk).update(state = True)
        if supplier_active == 1:
            return Response({'message': 'Proveedor habilitado nuevamente'}, status = status.HTTP_200_OK)
        else:
            Response({'message': "Proveedor invalido"}, status = status.HTTP_404_NOT_FOUND)