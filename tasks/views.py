from django.shortcuts import render

# Create your views here.
def mytask(request):
    return render(request, 'mytask.html')

def addtask(request):
    return render(request, 'addtask.html')