export let tasks = [];

export function getTasks() {
    const storedTasks = localStorage.getItem('tasks');
    tasks = storedTasks ? JSON.parse(storedTasks) : [];
    return tasks;
}

export function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

export function addTask(taskText) {
    tasks.push({ text: taskText, completed: false });
    saveTasks();
}

export function markTaskAsCompleted(index) {
    tasks[index].completed = true;
    saveTasks();
}

export function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
}

export function deleteCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
}

