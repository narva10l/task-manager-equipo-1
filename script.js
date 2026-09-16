// script.js

// Referencias a elementos del DOM
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Array para almacenar las tareas (persistidas en localStorage)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [
  { text: 'Estudiar para el examen', completed: false },
  { text: 'Entregar laboratorio', completed: false },
  { text: 'Revisar documentación', completed: false }
];

// Renderiza todas las tareas en el DOM
function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('task-item');
    if (task.completed) {
      li.classList.add('completed');
    }

    // Texto de la tarea (clic para marcar/desmarcar)
    const span = document.createElement('span');
    span.textContent = task.text;
    span.classList.add('task-text');
    span.addEventListener('click', () => toggleComplete(index));

    // Botón eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => deleteTask(index));

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  saveTasks();
}

// Agregar una nueva tarea
function addTask() {
  const text = taskInput.value.trim();

  if (text === '') {
    alert('Por favor escribe una tarea.');
    return;
  }

  tasks.push({ text: text, completed: false });
  taskInput.value = '';
  taskInput.focus();
  renderTasks();
}

// Marcar/desmarcar tarea como completada
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Eliminar tarea
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Guardar tareas en localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Eventos
addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Renderizar tareas al cargar la página
document.addEventListener('DOMContentLoaded', renderTasks);