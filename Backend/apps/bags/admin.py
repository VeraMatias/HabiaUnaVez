from django.contrib import admin

from apps.bags.models import *

# Register your models here.

admin.site.register(Bags)
admin.site.register(Sent)
admin.site.register(Received)
admin.site.register(NotReceived)
admin.site.register(Institution)
admin.site.register(ProductSent)
admin.site.register(ProductReceived)
admin.site.register(ProductNotReceived)