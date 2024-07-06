from django.shortcuts import render,HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate,login,logout
from rest_framework import permissions
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from .serializers import ProductSerializer
from .models import *



cart_count=0
userisvalid=False
Uname=''

class home(APIView):
    def get(self,request):
          # MAIN PAGE
          
        #   print(request.session.get('userauth'))
          try:
              if request.session['userauth']==False:
              # NOT LOGIN FRONTEND
                return Response({"message":"User is not logged in"})
          except Exception as e:
              # LOGIN FRONTEND
              return Response({"message":"hello peoples!"})
          
class register_user(APIView):
    permission_classes=[permissions.AllowAny]
    def get(self, request):
        # FRONTEND
        return Response({"message":"hello peoples!","session":userisvalid,'cart':cart_count,'username':Uname})
    def post(self,request):
        u=User()
        u.username=request.data["username"]
        u.password=request.data["password"]
        u.set_password(u.password) # testing
        u.first_name=request.data["first_name"]
        u.last_name=request.data["last_name"]
        u.email=request.data["email"]
        check=User.objects.all().filter(username=u.username)
        check2=User.objects.all().filter(email=u.email)
        if check and check2:
            return Response({"message":"username already exists!"})
        else:
            user.objects.create(name=u.username,first_name=u.first_name,last_name=u.last_name,email=u.email)
            u.save()
            global cart_count
            cart_count=request.session['count'] = 0

            return Response({"message":"Successfully registered"})

class login_user(APIView):
    permission_classes=[permissions.AllowAny]
    
    def get(self, request):
        # FRONTEND
        return Response({"message":"hello peoples!"})
    def post(self, request):
        username=request.data["username"]
        password=request.GET["password"]
        user=authenticate(request,username=username,password=password)
        if user is not None:
            login(request,user)
            request.session['userauth'] = True
            request.session['uname'] = username
            global userisvalid
            global Uname
            userisvalid=True
            Uname=username
            return Response({"message":"login successfull!"})
        else:
            return Response({"message":"login failed!"})    

class logout_user(APIView):
    def get(self, request):
        logout(request)
        request.session['userauth'] = False
        return Response({"message":"logout successfull!"})
    
class viewproduct(APIView):
    def get(self,request):
        p=Product.objects.all()
        serializers=ProductSerializer(p,many=True)
        return Response({"data":serializers.data})

class productdetail(APIView):
    def get(self, request, pk):
        p=Product.objects.get(pk=pk)
        serializers=ProductSerializer(p)
        return Response({"data":serializers.data})

class addtocart(APIView):
    permission_classes=[permissions.IsAuthenticated]
    def get(self,request):
        cart=Cart()
        total_products=cart.products.all()
        serializers=ProductSerializer(total_products, many=True)
        return Response({"data":serializers.data})
    def post(self, request,pk,product_quantity):
        # FRONTEND
        cart=Cart()
        cart.user=Uname
        cart.products.add(Product.objects.get(pk=pk))
        global cart_count
        cart_count+=1
        cart.save()
        return Response({"message":"hello peoples!"})
    


# Create your views here.
