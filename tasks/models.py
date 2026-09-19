from django.db import models
from django.contrib.auth.models import User

# Create your models here.
CATEGORY_CHOICES = [
    ('Customized', 'Customized'),
    ('work', 'Work'),
    ('study', 'Study'),
    ('design', 'Design'),
    ('projects', 'Projects'),
    ('personal', 'Personal'),
    ]
PRIORITY_CHOICES = [
    ('high', 'High'),
    ('medium', 'Medium'),
    ('low', 'Low'),
    ]
class Tasks(models.Model):

    # user = models.ForeignKey(
    # User,
    # on_delete=models.CASCADE
    # )

    title = models.CharField(max_length=50)

    description = models.TextField(blank=True)

    category = models.CharField(
    max_length=20,
    choices=CATEGORY_CHOICES
    )
    
    priority = models.CharField(
    max_length=10,
    choices=PRIORITY_CHOICES
    )

    custom_category = models.CharField(
    max_length=50,
    null=True, 
    blank=True
)

    custom_remind_time = models.DateTimeField(
    null=True,
    blank=True
    )

    tags = models.CharField(max_length=300, blank=True)

    remind = models.BooleanField(default=True)

    remind_time = models.IntegerField(null=True, blank=True)

    color = models.CharField(max_length=7, default="#c084fc")

    pin_fav = models.BooleanField(default=False)

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title


