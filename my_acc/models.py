from django.db import models

# Create your models here.
class myacc(models.Model):
    name = models.CharField(max_length=20)
    number=models.IntegerField()
    email=models.EmailField(max_length=30)
    password=models.CharField(max_length=20)
    c_password=models.CharField(max_length=20)

    def __str__(self):
        return self.name





