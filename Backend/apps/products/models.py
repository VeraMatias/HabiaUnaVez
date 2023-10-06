from django.db import models

from apps.base.models import BaseModel


class CategoryProduct(BaseModel):
    id = models.AutoField(primary_key= True)
    description = models.CharField('Descripcion', max_length = 50, blank = False, null = False, unique = True)

    class Meta:
        verbose_name = "Categoria de Producto"
        verbose_name_plural = "Categorias de Productos"

    def __str__(self):
        return self.description
    
class Supplier(BaseModel):
    id = models.AutoField(primary_key = True)
    name = models.CharField('Nombre del Proveedor', max_length = 50)
    url = models.URLField('Pagina Web', max_length = 200)
    
    ARMHOLE = [
        ("Chica", "Chica"),
        ("Normal", "Normal"),
        ("Grande", "Grande"),
    ]
    armhole = models.CharField('Moldería', max_length = 6, choices = ARMHOLE)

    class Meta:
        verbose_name = "Proveedor"
        verbose_name_plural = "Proveedores"

    def __str__(self):
        return self.name
    
class Product(BaseModel):
    code = models.IntegerField('Codigo', primary_key = True, blank = False, null = False, unique = True)
    quantity = models.IntegerField('Cantidad', blank = False, null = False, default = 1)
    cost = models.IntegerField('Costo', blank = False, null = False)
    price = models.IntegerField('Precio', blank = False, null = False)
    description = models.CharField('Descripcion', max_length = 100, blank = True, null = True)
    category_product = models.ForeignKey(CategoryProduct, on_delete = models.CASCADE, verbose_name = "Categoria de Producto", blank = False, null = False)
    image = models.ImageField('Imagen del Producto', upload_to ='products/', blank = True, null = True)
    supplier = models.ForeignKey(Supplier, verbose_name = 'Proveedor', on_delete = models.CASCADE, blank = False, null = False)

    class Meta:
        verbose_name = 'Producto'
        verbose_name_plural = 'Productos'

    def __str__(self):
        return str(self.code)