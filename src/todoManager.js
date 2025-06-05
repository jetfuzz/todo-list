export { projectArr, Task, Project, addTask, editTask, deleteTask, moveTask, addProject, editProject, deleteProject };

let TaskCounter = 1;
let ProjectCounter = 1;
let projectArr = [];

class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        this.id = TaskCounter++;
    }
}

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.id = ProjectCounter++;
    }
}

function addTask(project, title, description, dueDate, priority) {
    let task = new Task(title, description, dueDate, priority)
    project.tasks.push(task);
}

function editTask(project, id, property, edit) {
    let task = project.tasks.find((task) => task.id === id);
    if (task) {
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

function moveTask(oldProject, newProject, id) {
    let task = oldProject.tasks.find((task) => task.id === id);
    let index = oldProject.tasks.indexOf(task);
    if (index > -1) {
        oldProject.tasks.splice(index, 1);
    }
    newProject.tasks.push(task);
}

function addProject(projectName) {
    let newProject = new Project(projectName);
    projectArr.push(newProject);
    return newProject;
}

function editProject(id, newName) {
    let project = projectArr.find((project) => project.id === id);
    if (project) {
        project.name = newName;
    }
}

function deleteProject(id) {
    let project = projectArr.find((project) => project.id === id);
    let index = projectArr.indexOf(project);
    if (index > -1) {
        projectArr.splice(index, 1);
    }
}