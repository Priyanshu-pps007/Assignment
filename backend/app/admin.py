from django.contrib import admin
from .models import *

admin.site.register(user)
admin.site.register(Product)
admin.site.register(Cart)
admin.site.register(Order)

# Register your models here.
