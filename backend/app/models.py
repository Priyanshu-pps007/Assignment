from django.db import models

class user(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    first_name=models.CharField(max_length=50,default='John')
    last_name=models.CharField(max_length=50, default='Doe')


    def __str__(self):
        return self.name
    
class Product(models.Model):
    name = models.CharField(max_length=100)
    title=models.CharField(max_length=50)
    image = models.ImageField(upload_to='product_images',default=None)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    product_quantity = models.IntegerField(default=1)

    def __str__(self):
        return self.name
    
class Order(models.Model):
    order_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(user, on_delete=models.CASCADE)
    product = models.ManyToManyField(Product)
    quantity = models.IntegerField(default=1)
    Total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0)

class Cart(models.Model):
    user = models.ForeignKey(user, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product)
    count = models.IntegerField(default=0)



# Create your models here.
