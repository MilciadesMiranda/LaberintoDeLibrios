import re, uuid
from django.http import JsonResponse
from ManageStore.models import Review, Productos

def Insert_Review(data):

    comment = data.get('comment').strip()
    rating = data.get('rating')
    idproduct = data.get('idproduct').strip()
    
    try:
        producto = Productos.objects.get(id=idproduct)
    except Productos.DoesNotExist:
        return JsonResponse({'process': 'Error', 'message': 'El producto no existe'})

    try:
        Review(id = uuid.uuid4(), comentario=comment, valoracion=rating, producto=producto ).save()
        return JsonResponse({'process':'Success','message': 'Review añadida'})
    except Exception as e:
        return JsonResponse({'process':'Error', 'message': 'No se pudo guardar'})