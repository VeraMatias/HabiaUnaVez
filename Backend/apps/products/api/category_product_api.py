from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from apps.products.models import CategoryProduct

from apps.products.api.serializers.general_serializers import CategoryProductSerializer

class CategoryProductViewSet(viewsets.GenericViewSet):
    model = CategoryProduct
    serializer_class = CategoryProductSerializer

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
        category_product = self.get_queryset()
        category_product_serializers = self.serializer_class(category_product, many = True)
        return Response(category_product_serializers.data, status = status.HTTP_200_OK)
    
    def create(self, request):
        category_product_serializer = self.serializer_class(data = request.data)
        if category_product_serializer.is_valid():
            category_product_serializer.save()
            return Response({'message': 'Categoria cargado correctamente'}, status = status.HTTP_201_CREATED)
        return Response({'message': "Hay errores en la categoria", 'errors': category_product_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk = None):
        category_product = self.get_object(pk)
        category_product_serializer = self.serializer_class(category_product)
        return Response(category_product_serializer.data)
    
    def update(self, request, pk = None):
        category_product = self.get_object(pk)
        category_product_serializer = self.serializer_class(category_product, data = request.data)
        if category_product_serializer.is_valid():
            category_product_serializer.save()
            return Response({'message': 'Categoria modificado con exito'}, status = status.HTTP_200_OK)
        return Response({
            'message' : 'Error al intentar modificar la categoria',
            'errors': category_product_serializer.errors
        }, status = status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk = None):
        category_product_destroy = self.model.objects.filter(pk = pk).update(state = False)
        if category_product_destroy == 1:
            return Response({'message': 'Categoria eliminada correctamente'}, status = status.HTTP_200_OK)
        else:
            Response({'message': "Categoria invalida"}, status = status.HTTP_404_NOT_FOUND)

    '''
    --------------PERSONALIZATED VIEWS-------------
    '''

    @action(detail = True, methods= ['POST'], url_path = 'active_category_product')
    def active_category_product(self, request, pk = None):
        category_product_active = self.model.objects.filter(pk = pk).update(state = True)
        if category_product_active == 1:
            return Response({'message': 'Categoria habilitada nuevamente'}, status = status.HTTP_200_OK)
        else:
            Response({'message': "Categoria invalida"}, status = status.HTTP_404_NOT_FOUND)