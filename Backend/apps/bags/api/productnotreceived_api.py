from django.shortcuts import get_object_or_404

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from apps.bags.models import ProductNotReceived, Product, Bags, ProductSent, ProductReceived, NotReceived

from apps.bags.api.serializers.bags_serializers import ProductNotReceivedSerializer, MakeNotReceivedSerializer

class ProductNotReceivedViewSet(viewsets.GenericViewSet):
    model = ProductNotReceived
    serializer_class = ProductNotReceivedSerializer
    make_serializer = MakeNotReceivedSerializer

    '''
    --------------GET METHODS-------------
    '''
    def get_object(self, pk):
        return get_object_or_404(self.model, id = pk)
    
    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.all()
        return self.queryset
    
    def get_queryset_product(self, model = None ,sent_id = None, received_id = None, not_received_id = None):
        queryset = None
        if sent_id is not None and model is not None:
            queryset = model.objects.filter(sent = sent_id)
        if received_id is not None and model is not None:
            queryset = model.objects.filter(received = received_id)
        if not_received_id is not None and model is not None:
            queryset = model.objects.filter(not_received = not_received_id)
        return queryset

    '''
    --------------CRUD VIEWS-------------
    '''
    def list(self, request):
        product_received = self.get_queryset()
        product_received_serializers = self.serializer_class(product_received, many = True)
        return Response(product_received_serializers.data, status = status.HTTP_200_OK)
    
    def create(self, request):
        product_not_received_serializer = self.serializer_class(data = request.data)
        if product_not_received_serializer.is_valid():
            product_not_received_serializer.save()
            return Response({'message': 'Producto no devuelto cargado correctamente'}, status = status.HTTP_201_CREATED)
        return Response({'message': "Hay errores en el producto no devuelto", 'errors': product_not_received_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk = None):
        product_not_received = self.get_object(pk)
        product_not_received_serializer = self.serializer_class(product_not_received)
        return Response(product_not_received_serializer.data)
    
    def update(self, request, pk = None, sent = None, *args, **kwargs):
        product_not__received = self.get_object(pk)
        product_not__received_serializer = self.serializer_class(data = request.data)
        if product_not__received_serializer.is_valid():
            if product_not__received is not None:
                product = get_object_or_404(Product, pk = product_not__received_serializer.validated_data['product'].code)
                if product.quantity >= int(product_not__received_serializer.validated_data['quantity']):
                    product_not__received.quantity = int(product_not__received_serializer.validated_data['quantity']) 
                    product_not__received.save()
                    return Response({'message': 'Se actualizo la cantidad del producto no devuelto'}, status = status.HTTP_200_OK)
                else:
                    return Response({'message': "La cantidad de articulos es mayor a la existente", 'errors': product_not__received_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
        return Response({
            'message' : 'Error al intentar modificar el producto no devuelto',
            'errors': product_not__received_serializer.errors
        }, status = status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk = None):
        product_not_received = self.get_object(pk)
        if product_not_received:
            product_not_received.delete()
            return Response({'message': 'Producto no devuelto eliminado correctamente'}, status = status.HTTP_200_OK)
        Response({'message': "Producto no devuelto invalidos"}, status = status.HTTP_404_NOT_FOUND)

    # '''
    # --------------METHODS FOR PERSONALIZATED VIEWS-------------
    # '''
    def make_list_product_not_received(self, product_sent):
        list_product_not_received = list()
        for product in product_sent:
            dictionary = {'code': product.product.code, 'quantity': product.quantity}
            list_product_not_received.append(dictionary)
        return list_product_not_received
    
    def edit_list_product_not_received(self, product_received, list_product_not_received):
        list_product_not_received = list_product_not_received[:]
        for received in product_received:
            for element in list_product_not_received:
                if element['code'] == received.product.code:
                    if element['quantity'] - received.quantity == 0:
                        list_product_not_received.remove(element)
                    if element['quantity'] - received.quantity > 0:
                            element['quantity'] = element['quantity'] - received.quantity
                    else:
                        if element['quantity'] - received.quantity < 0:
                            return Response({'message': 'No se pudieroon crear los productos no devueltos.',
                                            'error': 'La cantidad recibida es mayor a la cantidad enviada en codigo: {}'.format(element['code']) }, status = status.HTTP_400_BAD_REQUEST)
        return list_product_not_received
    
    def create_product_not_received(self, not_received_id, list_product_not_received):
        if self.get_queryset_product(model = ProductNotReceived,not_received_id = not_received_id) is not None:
            for element in self.get_queryset_product(model = ProductNotReceived,not_received_id = not_received_id):
                element.delete()
            for element in list_product_not_received:
                new_product_not_received = ProductNotReceived(
                    not_received = get_object_or_404(NotReceived, pk = not_received_id),
                    product = get_object_or_404(Product, pk = element['code']),
                    quantity = element['quantity']
                )
                new_product_not_received.save()
        else:
            for element in list_product_not_received:
                new_product_not_received = ProductNotReceived(
                    not_received = get_object_or_404(NotReceived, pk = not_received_id),
                    product = get_object_or_404(Product, pk = element['code']),
                    quantity = element['quantity']
                )
                new_product_not_received.save()
        return True

    # '''
    # --------------PERSONALIZATED VIEWS-------------
    # '''

    @action(detail = False, methods= ['POST'], url_path = 'make_not_received')
    def make_not_received(self, request):
        make_products_serializer = self.make_serializer(data = request.data)
        if make_products_serializer.is_valid():
            bag_id = make_products_serializer.validated_data['bag_id']
            bag = get_object_or_404(Bags, pk = bag_id)
            product_sent = self.get_queryset_product(model = ProductSent,sent_id = bag.products_sent.pk)
            product_received = self.get_queryset_product(model = ProductReceived,received_id = bag.products_received.pk)
            not_received_id = bag.products_not_received.pk
            list_product_not_received_original = self.make_list_product_not_received(product_sent = product_sent)
            list_product_not_received = self.edit_list_product_not_received(product_received = product_received, list_product_not_received = list_product_not_received_original)
            self.create_product_not_received(not_received_id = not_received_id, list_product_not_received = list_product_not_received)
            return Response({'message': 'Productos No devueltos creados con exito.'}, status = status.HTTP_200_OK)
        return Response({'message': 'No se pudieroon crear los productos no devueltos.',
                        'error': make_products_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)

