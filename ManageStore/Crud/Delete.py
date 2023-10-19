import os
from django.http import JsonResponse
from ..models import Categorias, Productos

def Delete_Category(data):
    id = data.get('id').strip()
    try:
        categoria = Categorias.objects.get(id=id)
        categoria.delete()
        return JsonResponse({'process':'Success', 'message': 'Categoria eliminada'})
    except Categorias.DoesNotExist:
        return JsonResponse({'process':'Error', 'message': 'No se pudo borrar la categoria'})
    
def Delete_Product(request):
    id = request.POST['id']
    try:
        product = Productos.objects.get(id=id)
        image_path = product.imagen.path
        if os.path.isfile(image_path):
            os.remove(image_path)  
        product.delete()
        return JsonResponse({'process':'Success', 'message': 'Producto eliminada¿o'})
    except Productos.DoesNotExist:
        return JsonResponse({'process':'Error', 'message': 'No se pudo borrar la categoria'})