from django.urls import path
from . import views

urlpatterns = [

    #Session
	path('', views.Login, name="login"),
	path('logout/', views.Logout, name="logout"),
    path('register/', views.Register, name="register"),

    #Manage Store
    path('categories/', views.Categories, name="categories"),
    path('products/', views.Products, name="products"),
]
