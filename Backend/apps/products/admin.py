from django.contrib import admin

from apps.products.models import Product, CategoryProduct, Supplier

# Register your models here.

admin.site.register(Product)
admin.site.register(CategoryProduct)
admin.site.register(Supplier)