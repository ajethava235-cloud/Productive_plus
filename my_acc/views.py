from django.shortcuts import render, redirect
from .models import myacc

# Create your views here.
def register(request):
    if request.method=='POST':
        data = request.POST
        name = data.get('name')
        number = data.get('number')
        email = data.get('email')
        password = data.get('password')
        c_password = data.get('c_password')
        terms = data.get('terms')

        print("FORM DATA:", name, number, email, password, c_password)
        
        if password == c_password:
            myacc.objects.create(
                name=name,
                number=number,
                email=email,
                password=password,
                c_password=c_password
            )
            #return redirect('dashboard')
    return render(request, 'register.html')
