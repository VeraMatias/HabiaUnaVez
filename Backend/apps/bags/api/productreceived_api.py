from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from apps.bags.models import ProductReceived, Product, Bags, ProductSent

from apps.bags.api.serializers.bags_serializers import ProductReceivedSerializer, ExistReceivedSerializer

class ProductReceivedViewSet(viewsets.GenericViewSet):
    model = ProductReceived
    serializer_class = ProductReceivedSerializer
    exist_serializer = ExistReceivedSerializer

    '''
    --------------GET METHODS-------------
    '''
    def get_object(self, pk):
        return get_object_or_404(self.model, id = pk)
    
    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.all()
        return self.queryset

    '''
    --------------CRUD VIEWS-------------
    '''
    def list(self, request):
        product_received = self.get_queryset()
        product_received_serializers = self.serializer_class(product_received, many = True)
        return Response(product_received_serializers.data, status = status.HTTP_200_OK)
    
    def create(self, request):
        product_received_serializer = self.serializer_class(data = request.data)
        if product_received_serializer.is_valid():
            try:
                sent_product = get_object_or_404(self.model, received = product_received_serializer.validated_data['received'], product = product_received_serializer.validated_data['product'])
            except:
                sent_product = None

            if sent_product is not None:
                product = get_object_or_404(Product, pk = product_received_serializer.validated_data['product'].code)
                if product.quantity >= sent_product.quantity + int(product_received_serializer.validated_data['quantity']):
                    sent_product.quantity += int(product_received_serializer.validated_data['quantity']) 
                    sent_product.save()
                    return Response({'message': 'Se actualizo la cantidad del producto recibido'}, status = status.HTTP_200_OK)
                else:
                    return Response({'message': "La cantidad de articulos es mayor a la existente", 'errors': product_received_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
            else:
                product_received_serializer.save()
                return Response({'message': 'Producto recibido cargado correctamente'}, status = status.HTTP_201_CREATED)
        return Response({'message': "Hay errores en el producto recibido", 'errors': product_received_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk = None):
        product_received = self.get_object(pk)
        product_received_serializer = self.serializer_class(product_received)
        return Response(product_received_serializer.data)
    
    def update(self, request, pk = None, sent = None, *args, **kwargs):
        product_received = self.get_object(pk)
        product_received_serializer = self.serializer_class(data = request.data)
        if product_received_serializer.is_valid():
            if product_received is not None:
                product = get_object_or_404(Product, pk = product_received_serializer.validated_data['product'].code)
                if product.quantity >= int(product_received_serializer.validated_data['quantity']):
                    product_received.quantity = int(product_received_serializer.validated_data['quantity']) 
                    product_received.save()
                    return Response({'message': 'Se actualizo la cantidad del producto recibido'}, status = status.HTTP_200_OK)
                else:
                    return Response({'message': "La cantidad de articulos es mayor a la existente", 'errors': product_received_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
        return Response({
            'message' : 'Error al intentar modificar el producto recibido',
            'errors': product_received_serializer.errors
        }, status = status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk = None):
        product_received = self.get_object(pk)
        if product_received:
            product_received.delete()
            return Response({'message': 'Producto recibido eliminado correctamente'}, status = status.HTTP_200_OK)
        Response({'message': "Producto recibido invalidos"}, status = status.HTTP_404_NOT_FOUND)

    # '''
    # --------------PERSONALIZATED VIEWS-------------
    # '''

    @action(detail = False, methods= ['POST'], url_path = 'exist_in_sent')
    def exist_in_sent(self, request):
        received_product_serializer = self.exist_serializer(data = request.data)
        if received_product_serializer.is_valid():
            bag_id = received_product_serializer.validated_data['bag_id']
            received_code = received_product_serializer.validated_data['received_code']
            received_quantity = received_product_serializer.validated_data['received_quantity']
            bag = get_object_or_404(Bags, pk = bag_id)
            product_sent = get_object_or_404(ProductSent, sent = bag.products_sent, product = received_code)
            if product_sent.quantity >= received_quantity:
                return Response({'message': 'Producto apto para cargar en recibido'}, status = status.HTTP_200_OK)
            return Response({'message': 'Producto supera la cantidad enviada'}, status = status.HTTP_400_BAD_REQUEST)
        return Response({'message': 'Producto invalido'}, status = status.HTTP_400_BAD_REQUEST)