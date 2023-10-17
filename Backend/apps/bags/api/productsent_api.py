from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from apps.bags.models import ProductSent, Product

from apps.bags.api.serializers.bags_serializers import ProductSentSerializer

class ProductSentViewSet(viewsets.GenericViewSet):
    model = ProductSent
    serializer_class = ProductSentSerializer

    '''
    --------------GET METHODS-------------
    '''
    def get_object(self, pk):
        return get_object_or_404(self.model, id = pk)
    
    def get_queryset(self, pk_sent = None):
        if pk_sent is None:
            self.queryset = self.model.objects.all()
        else:
            self.queryset = self.model.objects.filter(sent = pk_sent)
        return self.queryset

    '''
    --------------CRUD VIEWS-------------
    '''
    def list(self, request):
        product_sent = self.get_queryset()
        product_sent_serializers = self.serializer_class(product_sent, many = True)
        return Response(product_sent_serializers.data, status = status.HTTP_200_OK)
    
    def create(self, request):
        product_sent_serializer = self.serializer_class(data = request.data)
        if product_sent_serializer.is_valid():
            try:
                sent_product = get_object_or_404(ProductSent, sent = product_sent_serializer.validated_data['sent'], product = product_sent_serializer.validated_data['product'])
            except:
                sent_product = None

            if sent_product is not None:
                product = get_object_or_404(Product, pk = product_sent_serializer.validated_data['product'].code)
                if product.quantity >= sent_product.quantity + int(product_sent_serializer.validated_data['quantity']):
                    sent_product.quantity += int(product_sent_serializer.validated_data['quantity']) 
                    sent_product.save()
                    return Response({'message': 'Se actualizo la cantidad del producto enviado'}, status = status.HTTP_200_OK)
                else:
                    return Response({'message': "La cantidad de articulos es mayor a la existente", 'errors': product_sent_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
            else:
                product_sent_serializer.save()
                return Response({'message': 'Producto enviado cargado correctamente'}, status = status.HTTP_201_CREATED)
        return Response({'message': "Hay errores en el producto enviado", 'errors': product_sent_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk = None):
        product_sent = self.get_object(pk)
        product_sent_serializer = self.serializer_class(product_sent)
        return Response(product_sent_serializer.data)
    
    def update(self, request, pk = None):
        product_sent = self.get_object(pk)
        product_sent_serializer = self.serializer_class(data = request.data)
        if product_sent_serializer.is_valid():
            if product_sent is not None:
                product = get_object_or_404(Product, pk = product_sent_serializer.validated_data['product'].code)
                if product.quantity >= int(product_sent_serializer.validated_data['quantity']):
                    product_sent.quantity = int(product_sent_serializer.validated_data['quantity']) 
                    product_sent.save()
                    return Response({'message': 'Se actualizo la cantidad del producto enviado'}, status = status.HTTP_200_OK)
                else:
                    return Response({'message': "La cantidad de articulos es mayor a la existente", 'errors': product_sent_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
        return Response({
            'message' : 'Error al intentar modificar el producto enviado',
            'errors': product_sent_serializer.errors
        }, status = status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk = None):
        product_sent = self.get_object(pk)
        if product_sent:
            product_sent.delete()
            return Response({'message': 'Producto enviado eliminado correctamente'}, status = status.HTTP_200_OK)
        Response({'message': "Producto enviado invalidos"}, status = status.HTTP_404_NOT_FOUND)

    '''
    --------------PERSONALIZATED VIEWS-------------
    '''
