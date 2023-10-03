from django.shortcuts import get_object_or_404
from django.contrib.auth.hashers import check_password

from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from apps.users.models import User

from apps.users.api.serializers.serializers import UserSerializer, UserListSerializer, UserUpdateSerializer, PasswordSerializer

class UserViewSet(viewsets.GenericViewSet):
    model = User
    serializer_class = UserSerializer
    list_serializer_class = UserListSerializer
    update_serializer_class = UserUpdateSerializer
    password_serializer_class = PasswordSerializer
    queryset = None

    '''
    --------------GET METHODS-------------
    '''
    def get_object(self, pk):
        return get_object_or_404(self.model, pk = pk)
    
    def get_queryset(self):
        if self.queryset is None:
            self.queryset = self.model.objects.filter(is_active = True).values('id','username','email')
        return self.queryset
    

    '''
    --------------CRUD VIEWS-------------
    '''
    def list(self, request):
        users = self.get_queryset()
        users_serializers = self.list_serializer_class(users, many = True)
        return Response(users_serializers.data, status = status.HTTP_200_OK)
    
    def create(self, request):
        user_serializer = self.serializer_class(data = request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({'message': 'Usuario registrado correctamente'}, status = status.HTTP_201_CREATED)
        return Response({'message': "Hay errores en el registro", 'errors': user_serializer.errors}, status = status.HTTP_400_BAD_REQUEST)
    
    def retrieve(self, request, pk = None):
        user = self.get_object(pk)
        user_serializer = self.serializer_class(user)
        return Response(user_serializer.data)
    
    def update(self, request, pk = None):
        user = self.get_object(pk)
        user_serializer = self.update_serializer_class(user, data = request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({'message': 'Usuario modificado con exito'}, status = status.HTTP_200_OK)
        return Response({
            'message' : 'Error al intentar modificar el usuario',
            'errors': user_serializer.errors
        }, status = status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk = None):
        user_destroy = self.model.objects.filter(id = pk).update(is_active = False)
        if user_destroy == 1:
            return Response({'message': 'Usuario eliminado correctamente'}, status = status.HTTP_200_OK)
        else:
            Response({'message': "Usuario invalido"}, status = status.HTTP_404_NOT_FOUND)
    


    '''
    --------------PERSONALIZATED VIEWS-------------
    '''

    @action(detail = True, methods = ['POST'], url_path = 'change_password')
    def set_password(self, request, pk = None):
        user = self.get_object(pk)
        password_serializer = self.password_serializer_class(data = request.data)  

        if password_serializer.is_valid():
            if check_password(password_serializer.validated_data['password_old'], user.password):
                user.set_password(password_serializer.validated_data['password'])
                user.save()
                return Response({'message': 'Contraseña actualizada correctamente'}, status = status.HTTP_200_OK)
            else:
                return Response({'message': 'Contraseña actual invalida'}, status = status.HTTP_400_BAD_REQUEST)
        
        return Response({
            'message': 'Hay errores en la contraseña enviada',
            'errors': password_serializer.errors
        }, status = status.HTTP_400_BAD_REQUEST)



    #Revivr user