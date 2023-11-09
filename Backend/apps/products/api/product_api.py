from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser

from apps.products.models import Product

from apps.products.api.serializers.product_serializers import ProductSerializer

class ProductViewSet(viewsets.GenericViewSet):
    model = Product
    serializer_class = ProductSerializer
    parser_classes = (MultiPartParser, FormParser)

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
        products = self.get_queryset()
        products_serializers = self.serializer_class(products, many = True)
        return Response(products_serializers.data, status = status.HTTP_200_OK)
    
    def create(self, request):
        product_serializer = self.serializer_class( data = request.data)
        if product_serializer.is_valid():
            product_serializer.save()
            return Response({'message': 'Producto cargado correctamente'}, status = status.HTTP_201_CREATED)
        return Response({'message': "Hay errores en el producto", 'errors': product_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk = None):
        product = self.get_object(pk)
        product_serializer = self.serializer_class(product)
        return Response(product_serializer.data)
    
    def update(self, request, pk = None):
        product = self.get_object(pk)
        product_serializer = self.serializer_class(product, data = request.data)
        if product_serializer.is_valid():
            product_serializer.save()
            return Response({'message': 'Producto modificado con exito'}, status = status.HTTP_200_OK)
        return Response({
            'message' : 'Error al intentar modificar el producto',
            'errors': product_serializer.errors
        }, status = status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk = None):
        product_destroy = self.model.objects.filter(pk = pk).update(state = False)
        if product_destroy == 1:
            return Response({'message': 'Producto eliminado correctamente'}, status = status.HTTP_200_OK)
        else:
            Response({'message': "Producto invalido"}, status = status.HTTP_404_NOT_FOUND)

    '''
    --------------PERSONALIZATED VIEWS-------------
    '''

    @action(detail = True, methods= ['POST'], url_path = 'active_product')
    def active_product(self, request, pk = None):
        product_active = self.model.objects.filter(pk = pk).update(state = True)
        if product_active == 1:
            return Response({'message': 'Producto habilitado nuevamente'}, status = status.HTTP_200_OK)
        else:
            Response({'message': "Producto invalido"}, status = status.HTTP_404_NOT_FOUND)