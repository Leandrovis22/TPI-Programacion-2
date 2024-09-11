document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');

    // Cargar tareas desde localStorage al iniciar
    loadTasks();

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const li = createTaskElement(taskText);
            taskList.appendChild(li);
            saveTasks();
            taskInput.value = '';
        }
    }

    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task">${taskText}</span>
            <button class="edit">Editar</button>
            <button class="complete">Completar</button>
            <button class="delete">Eliminar</button>
        `;
    
        // Función de eliminar
        li.querySelector('.delete').addEventListener('click', () => {
            li.remove();
            saveTasks();
        });
    
        // Función de completar
        li.querySelector('.complete').addEventListener('click', () => {
            li.querySelector('.task').classList.toggle('completed');
            saveTasks();
        });
    
        // Función de editar
        li.querySelector('.edit').addEventListener('click', () => {
            console.log('Edit button clicked!'); // Añadir esta línea para verificar
            const newTaskText = prompt('Editar tarea:', li.querySelector('.task').textContent);
            if (newTaskText) {
                li.querySelector('.task').textContent = newTaskText;
                saveTasks();
            }
        });
    
        return li;
    }
    

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('.task').textContent,
                completed: li.querySelector('.task').classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = createTaskElement(task.text);
            if (task.completed) {
                li.querySelector('.task').classList.add('completed');
            }
            taskList.appendChild(li);
        });
    }
});
