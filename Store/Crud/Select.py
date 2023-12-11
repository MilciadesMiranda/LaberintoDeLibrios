import base64
from django.http import JsonResponse
from ManageStore.models import Categorias, Productos, Review

def Select_All_Categories():
    array = []
    for categoria in Categorias.objects.all():
        array.append({
            'id': str(categoria.id),
            'name': categoria.nombre,
            'description': categoria.descripcion
        })
    return JsonResponse({'data':array}, status=200)

def Select_All_Products():
    array = []
    for producto in Productos.objects.all():

        data = {
            'id': str(producto.id),
            'name': producto.nombre,
            'description': producto.descripcion,
            'price': producto.precio,
            'idcategory': producto.categoria.id,
            'category': producto.categoria.nombre,
        }

        if producto.imagen:
            with open(producto.imagen.path, 'rb') as image_file:
                data['img'] = base64.b64encode(image_file.read()).decode('utf-8') 
            array.append(data)
            
    return JsonResponse({'data':array}, status=200)


def Select_Products_Category(request):

    idcategory = request.POST['idcategpry']
    array = []

    for producto in Productos.objects.filter(categoria=idcategory):

        data = {
            'id': str(producto.id),
            'name': producto.nombre,
            'description': producto.descripcion,
            'price': producto.precio,
            'idcategory': producto.categoria.id,
            'category': producto.categoria.nombre
        }

        if producto.imagen:
            with open(producto.imagen.path, 'rb') as image_file:
                data['img'] = base64.b64encode(image_file.read()).decode('utf-8') 
            array.append(data)
            
    return JsonResponse({'data':array}, status=200)

def Select_Products_Name(request):

    name = request.POST['name']
    array = []

    for producto in Productos.objects.filter(nombre__startswith=name):

        data = {
            'id': str(producto.id),
            'name': producto.nombre,
            'description': producto.descripcion,
            'price': producto.precio,
            'idcategory': producto.categoria.id,
            'category': producto.categoria.nombre
        }

        if producto.imagen:
            with open(producto.imagen.path, 'rb') as image_file:
                data['img'] = base64.b64encode(image_file.read()).decode('utf-8') 
            array.append(data)
            
    return JsonResponse({'data':array}, status=200)

def Select_Review_Product(data):
    idproduct = data.get('idproduct').strip()
    array = []
    for review in Review.objects.filter(producto=idproduct):
        array.append({
            'comment': review.comentario,
            'rating': review.valoracion
        })
    return JsonResponse({'data':array}, status=200)