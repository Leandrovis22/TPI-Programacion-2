document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput')
    const addTaskButton = document.getElementById('addTask')
    const taskList = document.getElementById('taskList')

    addTaskButton.addEventListener('click', () => {
      addTask()
    })

    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTask()
      }
    })

    function addTask() {
      const taskText = taskInput.value.trim()
      if (taskText) {
        const li = document.createElement('li')
        li.innerHTML = `
          <span>${taskText}</span>
          <button class="delete">Eliminar</button>
        `
        li.querySelector('.delete').addEventListener('click', () => {
          li.remove()
        })
        taskList.appendChild(li)
        taskInput.value = ''
      }
    }
  })