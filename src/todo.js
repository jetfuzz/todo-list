import { addDays } from 'date-fns';
export { Task, Project, addTask, editTask, deleteTask };

let TaskCounter = 1;

class Task {
    constructor(title, description, dueDate, priority) {
        this.id = TaskCounter++;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }
}

function addTask(project, title, description, dueDate, priority) {
    let task = new Task(title, description, dueDate, priority)
    project.tasks.push(task);
}

function editTask(project, id, property, edit) {
    let task = project.tasks.find((task) => task.id === id);
    if (task.id === id) {
        task[property] = edit;
    }
}

function deleteTask(project, id) {
    let task = project.tasks.find((task) => task.id === id);
    let index = project.tasks.indexOf(task);
    if (index > -1) {
        project.tasks.splice(index, 1);
    }
}
