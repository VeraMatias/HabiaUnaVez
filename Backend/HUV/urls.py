from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('apps.users.api.routers')),
    path('products/', include('apps.products.api.routers')),
    path('bags/', include('apps.bags.api.routers'))
]

