from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('apps.users.api.routers')),
    path('products/', include('apps.products.api.routers')),
    path('bags/', include('apps.bags.api.routers'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

