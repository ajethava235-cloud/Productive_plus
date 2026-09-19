from django.shortcuts import redirect, render
from tasks.models import Tasks

# Create your views here.
def mytask(request):
    return render(request, 'mytask.html')

def addtask(request):
    if request.method == 'POST':
        data = request.POST

        title = data.get('t_title')
        description = data.get('t_description')
        category = request.POST.get('t_category')
        custom_category = request.POST.get('t_custom_category')
        priority = request.POST.get('t_priority')
        tags = data.get('t_tags')
        remind = request.POST.get('t_remind_time')
        remind_time = data.get('t_custom_remind_time')
        task_color = data.get('t_color')
        pin_fav = request.POST.get('t_pin_fav')

        # Create a new task instance
        task = Tasks.objects.create(
            title=title,
            description=description,
            category=category,
            custom_category=custom_category,
            priority=priority,
            tags=tags,
            remind=remind == 'on',  # Convert to boolean
            remind_time=remind_time if remind == 'on' else None,  # Set to None if remind is not checked
            color=task_color,
            pin_fav=pin_fav == 'on',  # Convert to boolean
        )

        return redirect('mytask')  # Redirect to the mytask page after saving

    return render(request, 'addtask.html')