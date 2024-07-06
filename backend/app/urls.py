from django.contrib import admin
from django.urls import path,include    
from app import views
from app.views import *
from django.conf import settings
from django.conf.urls.static import static
from django_nextjs.views import nextjs_page

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home.as_view(), name='home'),
    path('product/<int:pk>',productdetail.as_view(),name='productdetail'),
    path('login',login_user.as_view(),name='login'),
    path('logout', logout_user.as_view(), name='logout'),
    path('register', register_user.as_view(), name='register'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)