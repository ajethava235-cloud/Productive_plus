from django.shortcuts import render, redirect
from django.contrib import messages

from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
from httpx import request
# Create your views here.
def register(request):

    if request.method=='POST':
        data = request.POST
        firstname = data.get('f_name')
        lastname = data.get('l_name')
        username = data.get('u_name')
        email = data.get('email')
        password = data.get('password')
        c_password = data.get('c_password')
        terms = request.POST.get('terms')

        if password == c_password:
            user = User.objects.filter(username=username)

            if user.exists():
                messages.error(request, 'Username already exists')
                return redirect('register')      

            if terms != 'accepted':
                messages.error(request, 'Please accept the Terms of Service.')
                return redirect('register')

            user = User.objects.create(
                first_name = firstname,
                last_name = lastname,
                username = username,
                email = email
            )

            user.set_password(password)
            user.save()

            login(request, user)
            print("USER:", request.user)
            print("AUTHENTICATED:", request.user.is_authenticated)
            return redirect('dashboard')

    return render(request, 'register.html')

def signin(request):
    if request.method == 'POST':

        data = request.POST

        username = data.get('u_name')
        email = data.get('email')
        password = data.get('password')

        if not User.objects.filter(username=username).exists():
            messages.error(request, 'Username does not exist')
            return redirect('login')

        user = authenticate(request, username=username, password=password)

        if user is None:
            messages.error(request,'Invalid password')
            return redirect('login')
        else:
            login(request,user)
            print("USER:", request.user)
            print("AUTHENTICATED:", request.user.is_authenticated)
            return redirect('dashboard')
    return render(request, 'login.html')
