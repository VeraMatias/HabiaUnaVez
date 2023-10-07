from django.db import models

from apps.base.models import BaseModel
from apps.products.models import Product


class Sent(BaseModel):
    id = models.AutoField(primary_key = True)
    products = models.ManyToManyField(Product, verbose_name= 'productos enviados')

    class Meta:
        verbose_name = "Enviado"
        verbose_name_plural = "Enviados"

    def __str__(self):
        return str(self.id)
    
class Received(BaseModel):
    id = models.AutoField(primary_key = True)
    products = models.ManyToManyField(Product, verbose_name= 'productos recibidos')

    class Meta:
        verbose_name = "Recibido"
        verbose_name_plural = "Recibidos"

    def __str__(self):
        return str(self.id)
    
class Not_received(BaseModel):
    id = models.AutoField(primary_key = True)
    products = models.ManyToManyField(Product, verbose_name= 'productos no devueltos')

    class Meta:
        verbose_name = "No devuelto"
        verbose_name_plural = "No devueltos"

    def __str__(self):
        return str(self.id)
    
class Institution(BaseModel):
    id = models.AutoField(primary_key = True)
    name = models.CharField('Nombre', max_length = 50, blank = False, null = False, unique = True)

    class Meta:
        verbose_name = "Institucion"
        verbose_name_plural = "Instituciones"

    def __str__(self):
        return self.name
    
class Bags(BaseModel):
    id = models.AutoField(primary_key = True)
    name = models.CharField('Nombre', max_length = 50, blank = False, null = False, unique = True)
    institution = models.ForeignKey(Institution, on_delete = models.CASCADE, verbose_name = "Institucion", blank = False, null = False)
    products_sent = models.ForeignKey(Sent, on_delete = models.CASCADE, verbose_name = "Productos Enviados", blank = False, null = False)
    products_received = models.ForeignKey(Received, on_delete = models.CASCADE, verbose_name = "Productos Recibidos", blank = True, null = True)
    products_not_received = models.ForeignKey(Not_received, on_delete = models.CASCADE, verbose_name = "Productos No Devueltos", blank = True, null = True)

    class Meta:
        verbose_name = "Bolso"
        verbose_name_plural = "Bolsos"

    def __str__(self):
        return self.name + '-' +  str(self.created_date) + '-' + self.institution.name
