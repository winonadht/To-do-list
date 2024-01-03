import { getTasks, addTask, markTaskAsCompleted, deleteCompletedTasks, deleteTask, tasks, saveTasks } from './script.js';

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const deleteCompletedBtn = document.getElementById('supprimertaches');

    function renderTasks() {
        taskList.innerHTML = '';
        getTasks().forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task';
            if (task.completed) {
                taskItem.classList.add('completed-task');
            }

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => {
                markTaskAsCompleted(index);
                renderTasks();
            });

            const taskText = document.createElement('span');
            taskText.textContent = task.text;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Supprimer';
            deleteBtn.addEventListener('click', () => {
                deleteTask(index);
                renderTasks();
            });

            taskItem.appendChild(checkbox);
            taskItem.appendChild(taskText);
            taskItem.appendChild(deleteBtn);
            taskList.appendChild(taskItem);
        });
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
    }

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            renderTasks();
        }
    });

    deleteCompletedBtn.addEventListener('click', () => {
        deleteCompletedTasks();
        renderTasks();
    });

    renderTasks();
});