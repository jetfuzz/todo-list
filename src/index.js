import "./style.css";
import * as todoManager from "./todoManager.js";
import * as DOMController from "./domController.js";
import * as storage from "./storage.js";
import { format, addDays, eachDayOfInterval } from "date-fns";

//create default project
let defaultProject = todoManager.addProject("Test Project");

//placeholder projects + tasks 
let secondProject = todoManager.addProject("Second Project");
let thirdProject = todoManager.addProject("Third Project");
todoManager.addTask(defaultProject, "Test Task", "Description", format(new Date(), "yyyy-MM-dd"), "high");
todoManager.addTask(defaultProject, "Another Task", "Yes", format(new Date(), "yyyy-MM-dd"), "medium");
todoManager.addTask(secondProject, "This Task", "Okay", format(addDays(new Date(), 2), "yyyy-MM-dd"), "low");
todoManager.addTask(thirdProject, "Yet Another Task", "", format(addDays(new Date(), 8), "yyyy-MM-dd"), "medium");

// storage.saveProjectsToStorage(todoManager.projectArr);
let storedProjectsArr = storage.getProjectsFromStorage();
todoManager.storeProjectsToArray(storedProjectsArr);

let contentDiv = document.getElementById("content");
let navDiv = document.getElementById("nav");

let allBtn = document.getElementById("all-btn");
let todayBtn = document.getElementById("today-btn");
let weekBtn = document.getElementById("week-btn");

let modal = document.getElementById("modal");
let form = document.getElementById("modal-form");

let addTaskBtn = document.getElementById("add-task-btn");
let addProjectBtn = document.getElementById("add-project-btn");

let currentProjectTitle = document.querySelector(".current-project");
let currentTaskCountPara = document.querySelector(".task-count");

//display all tasks and projects on page load
DOMController.displayAllTasks(todoManager.projectArr);
DOMController.displayProjects(todoManager.projectArr);
let taskCount = getAllTaskCount();
currentProjectTitle.textContent = "All";
currentTaskCountPara.textContent = `${taskCount} Tasks`;

//store last clicked navigation tab
let currentView = "all";
let currentProject = null;

//state tracking variable for displaying correct modal
let modalMode;

//store task info during edit
let currentTask = {};

//display the correct navigation tab/project after editing/deleting a task
function displayCurrentView() {
    if (currentProject === null) {
        if (currentView === "all") {
            DOMController.displayAllTasks(todoManager.projectArr);
            updateTaskCompleteStyling();
        } else if (currentView === "today") {
            DOMController.displayTodayTasks(todoManager.projectArr);
            updateTaskCompleteStyling();
        } else if (currentView === "week") {
            DOMController.displayWeekTasks(todoManager.projectArr);
            updateTaskCompleteStyling();
        }
    } 
    else if (currentProject != null) {
        let project = todoManager.projectArr.find((project) => project.id === currentProject);
        DOMController.displayTasks(project)
        updateTaskCompleteStyling();
    } 
}

function getTaskFromEvent(e) {
    let taskDiv = e.target.closest('.task');
    let taskId = parseInt(taskDiv.dataset.taskId);
    let projectId = parseInt(taskDiv.dataset.projectId);
    let project = todoManager.projectArr.find((project) => project.id === projectId);
    let task = project.tasks.find((task) => task.id === taskId);

    return { task, project, taskId, projectId, taskDiv }
}

function getAllTaskCount() {
    let taskCount = 0;
    todoManager.projectArr.forEach(project => {
        project.tasks.forEach(task => {
            taskCount++
        })
    });
    return taskCount;
}

function getProjectTaskCount(project) {
    let taskCount = 0;
    project.tasks.forEach(task => {
        taskCount++
    });
    return taskCount;
}

function getTodayTaskCount(projects) {
    let taskCount = 0;
    let today = format(new Date(), "yyyy-MM-dd");
    projects.forEach(project => {
        project.tasks.forEach(task => {
            if (task.dueDate === today) {
                taskCount++
            }
        })
    });
    return taskCount;
}

function getWeekTaskCount(projects) {
    let taskCount = 0;
    const thisWeek = eachDayOfInterval({
        start: new Date(),
        end: addDays(new Date(), 7)
    })

    projects.forEach(project => {
        project.tasks.forEach(task => {
            thisWeek.forEach(day => {
                if (task.dueDate === format(day, "yyyy-MM-dd")) {
                    taskCount++
                }
            })
        })
    });
    return taskCount;
}

function updateTaskCompleteStyling() {
    document.querySelectorAll(".task").forEach(taskDiv => {
        let taskId = parseInt(taskDiv.dataset.taskId);
        let projectId = parseInt(taskDiv.dataset.projectId);
        let project = todoManager.projectArr.find((project) => project.id === projectId);
        let task = project.tasks.find((task) => task.id === taskId);
        if (!task.completed) {
            DOMController.setTaskCompleteStyle(taskDiv, task.completed);
        } else {
            DOMController.setTaskCompleteStyle(taskDiv, task.completed);
        }
    });
}

function getFormValues() {
    let title = document.getElementById("form-title").value;
    let desc = document.getElementById("form-desc").value;
    let dueDate = document.getElementById("form-date").value;
    let priority = document.getElementById("form-prio").value;
    let projectId = parseInt(document.getElementById("form-project").value);
    let project = todoManager.projectArr.find((project) => project.id === projectId);

    return { title, desc, dueDate, priority, projectId, project }
}

window.addEventListener("load", () => {
    updateTaskCompleteStyling()
});

//nav tabs
allBtn.addEventListener("click", () => {
    let taskCount = getAllTaskCount();
    currentProjectTitle.textContent = "All";
    currentView = "all";
    currentProject = null;
    currentTaskCountPara.textContent = `${taskCount} Tasks`;
    DOMController.clearTasks();
    DOMController.displayAllTasks(todoManager.projectArr);
    updateTaskCompleteStyling();
})

todayBtn.addEventListener("click", () => {
    currentProjectTitle.textContent = "Today";
    currentView = "today";
    currentProject = null;
    let taskCount = getTodayTaskCount(todoManager.projectArr);
    currentTaskCountPara.textContent = `${taskCount} Tasks`;
    DOMController.clearTasks();
    DOMController.displayTodayTasks(todoManager.projectArr);
    updateTaskCompleteStyling();
})

weekBtn.addEventListener("click", () => {
    currentProjectTitle.textContent = "Week";
    currentView = "week";
    currentProject = null;
    let taskCount = getWeekTaskCount(todoManager.projectArr);
    currentTaskCountPara.textContent = `${taskCount} Tasks`;
    DOMController.clearTasks();
    DOMController.displayWeekTasks(todoManager.projectArr);
    updateTaskCompleteStyling();
})

//handle project nav events (change view, delete, edit)
navDiv.addEventListener("click", (e) => {
    let projectDiv = e.target.closest(".project-div");
    let projectDelete = e.target.closest(".project-delete");
    let projectId;
    if (projectDelete) {
        projectId = parseInt(projectDiv.dataset.projectId);
        todoManager.deleteProject(projectId);
        DOMController.clearProjects();
        DOMController.clearTasks();
        DOMController.displayProjects(todoManager.projectArr);
        currentProject = null;
        let taskCount = getAllTaskCount();
        currentProjectTitle.textContent = "All";
        currentTaskCountPara.textContent = `${taskCount} Tasks`;
        displayCurrentView();
        storage.saveProjectsToStorage(todoManager.projectArr);
        return;
    } else if (projectDiv) {
        projectId = parseInt(projectDiv.dataset.projectId);
        currentProject = projectId;
        let project = todoManager.projectArr.find((project) => project.id === projectId);
        DOMController.clearTasks();
        DOMController.displayTasks(project);
        let taskCount = getProjectTaskCount(project);
        currentProjectTitle.textContent = project.name;
        currentTaskCountPara.textContent = `${taskCount} Tasks`;
        updateTaskCompleteStyling();
    }
})

//delete task
contentDiv.addEventListener("click", (e) => {
    if(e.target.className === "task-delete") {
        let { project, taskId } = getTaskFromEvent(e);
        todoManager.deleteTask(project, taskId);
        DOMController.clearTasks();
        displayCurrentView();
        storage.saveProjectsToStorage(todoManager.projectArr);
    }
})

//add task
addTaskBtn.addEventListener("click", () => {
    modalMode = "addTask";
    DOMController.displayTaskModal("Add", todoManager.projectArr);
    modal.showModal();
})

//edit task
contentDiv.addEventListener("click", (e) => {
    if(e.target.className === "task-edit") {
        modalMode = "editTask";
        DOMController.displayTaskModal("Edit", todoManager.projectArr);
        let { project, task } = getTaskFromEvent(e);
        currentTask = {};
        currentTask = { id: task.id, project: project }
        //fill form values with current task info
        document.getElementById("form-title").value = task.title;
        document.getElementById("form-date").value = task.dueDate;
        document.getElementById("form-prio").value = task.priority;
        document.getElementById("form-project").value = project.id;
        if (task.desc != undefined) {
            document.getElementById("form-desc").value = task.desc;
        } else {
            document.getElementById("form-desc").value = "";
        }
        modal.showModal();
    }
})

//task completion
contentDiv.addEventListener("click", (e) => {
    if (e.target.className === "task-checkbox") {
        let { project, taskId, taskDiv, task } = getTaskFromEvent(e);
        if (!task.completed) {
            todoManager.toggleTaskCompletion(project, taskId);
            DOMController.setTaskCompleteStyle(taskDiv, task.completed);
        } else {
            todoManager.toggleTaskCompletion(project, taskId);
            DOMController.setTaskCompleteStyle(taskDiv, task.completed);
        }
        storage.saveProjectsToStorage(todoManager.projectArr);
    }
})

//add project
addProjectBtn.addEventListener("click", () => {
    modalMode = "addProject";
    DOMController.displayProjectModal("Add")
    modal.showModal();
})

//handle form submit based on current modalMode
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (modalMode === "addTask") {
        let { project, title, desc, dueDate, priority } = getFormValues();
        todoManager.addTask(project, title, desc, dueDate, priority);
    } else if (modalMode === "editTask") {
        let { project, title, desc, dueDate, priority } = getFormValues();
        let taskId = currentTask.id;
        let currentProject = currentTask.project;
        if (currentProject != project) {
            todoManager.moveTask(currentProject, project, taskId);
        }
        todoManager.editTask(project, taskId, "title", title);
        todoManager.editTask(project, taskId, "desc", desc);
        todoManager.editTask(project, taskId, "dueDate", dueDate);
        todoManager.editTask(project, taskId, "priority", priority);
    } else if (modalMode === "addProject") {
        let title = document.getElementById("form-title").value;
        todoManager.addProject(title);
        DOMController.clearProjects();
        DOMController.displayProjects(todoManager.projectArr);
    } else if (modalMode === "editProject") {

    }
    modal.close();
    DOMController.clearTasks();
    displayCurrentView();
    storage.saveProjectsToStorage(todoManager.projectArr);
})

//close modal events
modal.addEventListener("click", (e) => {
    if (e.target.className === "modal-close") {
        modal.close();
    }
})

document.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.close();
    }
});