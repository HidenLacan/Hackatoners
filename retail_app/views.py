from django.shortcuts import render

# Create your views here.
def principal_view(request):
    return render(request,'principal_view.html')