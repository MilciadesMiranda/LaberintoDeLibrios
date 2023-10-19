from django.db import models

class Categorias(models.Model):
    id = models.UUIDField(primary_key=True, editable=False)
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True, null=True)

class Productos(models.Model):
    id = models.UUIDField(primary_key=True, editable=False)
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen = models.ImageField(upload_to='Productos/', blank=True, null=True)
    categoria = models.ForeignKey('Categorias', on_delete=models.CASCADE)

class Review(models.Model):
    id = models.UUIDField(primary_key=True, editable=False)
    comentario = models.TextField()
    valoracion = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    producto = models.ForeignKey('Productos', on_delete=models.CASCADE)