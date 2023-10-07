from django.contrib import admin

from apps.bags.models import *

# Register your models here.

admin.site.register(Bags)
admin.site.register(Sent)
admin.site.register(Received)
admin.site.register(Not_received)
admin.site.register(Institution)