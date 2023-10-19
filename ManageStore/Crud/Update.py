import re, os
from django.http import JsonResponse
from django.conf import settings
from ..models import Categorias, Productos


regex = r'^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ.@ ]+$'

def Update_Category(data):
    
    id = data.get('id').strip()
    name = data.get('name').strip()
    description = data.get('description').strip()

    if re.match(regex, name) and re.match(regex, description):
        try:

            categoria = Categorias.objects.get(id=id)
            categoria.nombre = name
            categoria.descripcion = description
            categoria.save()

            return JsonResponse({'process':'Success', 'message': 'Categoria actualizada'})
        
        except Categorias.DoesNotExist:
            return JsonResponse({'process':'Error', 'message': 'No se pudo actualizar la categoria'})
    else:
        return JsonResponse({'process':'Error', 'message': 'Los datos no tiene el formato correcto'})

def Update_Product(request):

    id = request.POST['id']
    name = request.POST['name']
    description = request.POST['description']
    price = request.POST['price']
    idcategory = request.POST['idcategory']

    try:
        categoria = Categorias.objects.get(id=idcategory)
    except Categorias.DoesNotExist:
        return JsonResponse({'process': 'Error', 'message': 'La categoría no existe'})

    try:

        product = Productos.objects.get(id=id)
        product.nombre = name
        product.descripcion = description
        product.precio = price
        product.categoria = categoria
        
        if 'img' in request.FILES:
            image_path = product.imagen.path
            if os.path.isfile(image_path):
                os.remove(image_path)
            product.imagen = request.FILES['img']  
        product.save()

        return JsonResponse({'process':'Success', 'message': 'Producto actualizado'})
    except Categorias.DoesNotExist:
        return JsonResponse({'process':'Error', 'message': 'No se pudo actualizar el producto'})