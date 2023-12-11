import re, json
from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse

from .Crud import Insert, Select

# Session
def Login(request):

    if request.user.is_authenticated:
        return redirect('/products')
    else:
        if request.method == 'POST':

            nameemail = request.POST['nameemail']
            password = request.POST['pass']

            regex = r'^[a-zA-Z0-9.@]+$'
            if re.match(regex, nameemail) and re.match(regex, password):

                authname = authenticate(request, username=nameemail, password=password)
                if authname != None:
                    login(request, authname)
                    return redirect('/products')
                else:
                    user_info = User.objects.filter(email=nameemail).values('username').first()
                    if(user_info != None):
                        authemail = authenticate(request, username=user_info['username'], password=password)
                        if authemail != None:
                            login(request, authemail)
                            return redirect('/products')
                        else:
                            return render(request, 'Session/Login.html', {'error_message': 'Credenciales incorrectas'})
                    else:
                        return render(request, 'Session/Login.html', {'error_message': 'Credenciales no encontradas'})
            else:
                return render(request, 'Session/Login.html', {'error_message': 'Ingrese datos en los campos'})

        return render(request, 'Session/Login.html')

def Logout(request):
    logout(request)
    return redirect('/')

def Register(request):
    if request.user.is_authenticated:
        return redirect("/products")
    else:
        if request.method == 'POST':

            name = request.POST['name']
            email = request.POST['email']
            pass1 = request.POST['pass1']
            pass2 = request.POST['pass2']

            print(name, email, pass1, pass2)
            
            regex = r'^[a-zA-Z0-9.@]+$'
            if re.match(regex, name) and re.match(regex, email) and re.match(regex, pass1) and re.match(regex, pass2):

                if User.objects.filter(username=name).exists() or User.objects.filter(email=email).exists():
                    return render(request, 'Session/Register.html', {'error_message': 'Ya existen estas credenciales'})
                else:
                    if request.POST['pass1'] == request.POST['pass2']:
                        User.objects.create_user(username=name, email=email, password=pass1).save()
                        return redirect('/')
                    else:
                        return render(request, 'Session/Register.html', {'error_message': 'Contraseñas no coinciden'})
            else:
                return render(request, 'Session/Register.html', {'error_message': 'Ingrese datos en los campos'})
            
        return render(request, 'Session/Register.html')

# Manage Store
def Products(request):
    if request.user.is_authenticated:

        if request.method == 'GET':
            return render(request, 'Store/Products.html')
        
        if request.method == 'POST':
            if request.POST['type'] == 'select':
                return Select.Select_All_Products()
            elif request.POST['type'] == 'select_idcategory':
                return Select.Select_Products_Category(request)
            elif request.POST['type'] == 'select_name':
                return Select.Select_Products_Name(request)
            else:
                return JsonResponse({'process':'Error', 'message': 'El type no es valido'})            
    else:
        return redirect("/")

def Categories(request):

    if request.user.is_authenticated:

        if request.method == 'POST':
            
            data = json.loads(request.body.decode('utf-8'))

            if data.get('type') == 'select':
                return Select.Select_All_Categories()
            else:
                return JsonResponse({'process':'Error', 'message': 'El type no es valido'})
    else:
        return redirect("/")


def Review(request):
    if request.user.is_authenticated:

        if request.method == 'POST':

            data = json.loads(request.body.decode('utf-8'))
            
            if data.get('type') == 'insert':
                return Insert.Insert_Review(data)
            elif data.get('type') == 'select':
                return Select.Select_Review_Product(data)
            else:
                return JsonResponse({'process':'Error', 'message': 'El type no es valido'})
            
    else:
        return redirect("/")




