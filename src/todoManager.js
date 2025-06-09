export { projectArr, Task, Project, storeProjectsToArray, addTask, editTask, deleteTask, moveTask, toggleTaskCompletion, addProject, editProject, deleteProject };

let projectArr = [];

class Task {
    static counter = 1
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
        this.id = guidGenerator();
    }
}

class Project {
    static counter = 1;
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.id = guidGenerator();
    }
}

function guidGenerator() {
    let S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4());
 }
 

function storeProjectsToArray(array) {
    projectArr.length = 0
    projectArr.push(...array)
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

function toggleTaskCompletion(project, id) {
    let task = project.tasks.find((task) => task.id === id);
    if (!task.completed) {
        task.completed = true;
    } else {
        task.completed = false;
    }
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