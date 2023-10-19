import re, uuid
from django.http import JsonResponse
from ..models import Categorias, Productos

regex = r'^[a-zA-Z0-9áéíóúÁÉÍÓÚüÜñÑ.@ ]+$'

def Insert_Category(data):

    name = data.get('name').strip()
    description = data.get('description').strip()

    if re.match(regex, name) and re.match(regex, description):
        try:
            Categorias(id = uuid.uuid4(), nombre=name, descripcion=description).save()
            return JsonResponse({'process':'Success','message': 'Categoria añadida'})
        except Exception as e:
            return JsonResponse({'process':'Error', 'message': 'No se pudo guardo'})
    else:
        return JsonResponse({'process':'Error', 'message': 'Los datos no tiene el formato correcto'})
    
def Insert_Product(request):

    name = request.POST['name']
    description = request.POST['description']
    price = request.POST['price']
    idcategory = request.POST['idcategory']
    
    try:
        categoria = Categorias.objects.get(id=idcategory)
    except Categorias.DoesNotExist:
        return JsonResponse({'process': 'Error', 'message': 'La categoría no existe'})
    
    try:
        
        Productos(
            id = uuid.uuid4(),
            nombre=name,
            descripcion=description,
            precio=price,
            imagen= request.FILES['img'],
            categoria=categoria
        ).save()
        return JsonResponse({'process':'Success','message': 'Producto añadido'})
    except Categorias.DoesNotExist:
        return JsonResponse({'process': 'Error', 'message': 'La categoría no existe'})