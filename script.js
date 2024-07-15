document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('.task-text').innerText,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add a new task to the DOM
    const addTaskToDOM = (taskText, completed = false) => {
        const li = document.createElement('li');
        li.className = completed ? 'completed' : '';

        const taskTextSpan = document.createElement('span');
        taskTextSpan.className = 'task-text';
        taskTextSpan.innerText = taskText;
        li.appendChild(taskTextSpan);

        const taskButtons = document.createElement('div');
        taskButtons.className = 'task-buttons';

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.className = 'edit';
        editButton.addEventListener('click', () => editTask(taskTextSpan));

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', () => deleteTask(li));

        const toggleButton = document.createElement('button');
        toggleButton.innerText = completed ? 'Uncomplete' : 'Complete';
        toggleButton.className = 'toggle';
        toggleButton.addEventListener('click', () => toggleTaskCompleted(li, toggleButton));

        taskButtons.appendChild(editButton);
        taskButtons.appendChild(deleteButton);
        taskButtons.appendChild(toggleButton);
        li.appendChild(taskButtons);

        taskList.appendChild(li);
    };

    // Add a new task
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTaskToDOM(taskText);
            saveTasks();
            taskInput.value = '';
        }
    });

    // Edit an existing task
    const editTask = (taskTextSpan) => {
        const newTaskText = prompt('Edit task:', taskTextSpan.innerText);
        if (newTaskText) {
            taskTextSpan.innerText = newTaskText;
            saveTasks();
        }
    };

    // Delete a task
    const deleteTask = (taskItem) => {
        taskList.removeChild(taskItem);
        saveTasks();
    };

    // Toggle task completed state
    const toggleTaskCompleted = (taskItem, toggleButton) => {
        taskItem.classList.toggle('completed');
        toggleButton.innerText = taskItem.classList.contains('completed') ? 'Uncomplete' : 'Complete';
        saveTasks();
    };

    loadTasks();
});
