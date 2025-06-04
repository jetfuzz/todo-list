import "./style.css";
import * as todoManager from "./todoManager.js";
import * as DOMController from "./domController.js"
import { format, addDays } from "date-fns";

//create default project
let defaultProject = todoManager.addProject("Test Project");

//placeholder projects + tasks 
let secondProject = todoManager.addProject("Second Project");
let thirdProject = todoManager.addProject("Third Project")
todoManager.addTask(defaultProject, "Test Task", "Description", format(new Date(), "yyyy-MM-dd"), "high");
todoManager.addTask(defaultProject, "Another Task", "Yes", format(new Date(), "yyyy-MM-dd"), "medium");
todoManager.addTask(secondProject, "This Task", "Okay", format(addDays(new Date(), 2), "yyyy-MM-dd"), "low");
todoManager.addTask(thirdProject, "Yet Another Task", "", format(addDays(new Date(), 8), "yyyy-MM-dd"), "medium");

//display all tasks and projects on page load
DOMController.displayAllTasks(todoManager.projectArr);
DOMController.displayProjects(todoManager.projectArr);

let contentDiv = document.getElementById("content");
let navDiv = document.getElementById("nav");

let allBtn = document.getElementById("all-btn");
let todayBtn = document.getElementById("today-btn");
let weekBtn = document.getElementById("week-btn");

let modal = document.getElementById("modal");
let form = document.getElementById("modal-form");

let addTaskBtn = document.getElementById("add-task-btn");

//store last clicked navigation tab
let currentView = "all";
let currentProject = null;

//state tracking variable for displaying correct modal
let modalMode;

//display the correct navigation tab/project after editing/deleting a task
function displayCurrentView() {
    if (currentProject === null) {
        if (currentView === "all") {
            DOMController.displayAllTasks(todoManager.projectArr);
        } else if (currentView === "today") {
            //display tasks due today
        } else if (currentView === "week") {
            //display tasks due this week
        }
    } 
    else if (currentProject != null) {
        let project = todoManager.projectArr.find((project) => project.id === currentProject);
        DOMController.displayTasks(project)
    } 
}

//nav tabs
//all tasks
allBtn.addEventListener("click", () => {
    DOMController.clearTasks();
    DOMController.displayAllTasks(todoManager.projectArr);
    currentView = "all";
    currentProject = null;
})

//today tasks


//week tasks

//task events
//delete task
contentDiv.addEventListener("click", (e) => {
    if(e.target.className === "task-delete") {
        let taskDiv = e.target.closest('.task');
        let taskId = parseInt(taskDiv.dataset.taskId);
        let projectId = parseInt(taskDiv.dataset.projectId);
        let project = todoManager.projectArr.find((project) => project.id === projectId);
        todoManager.deleteTask(project, taskId);
        DOMController.clearTasks();
        displayCurrentView();
    }
})

//add task
addTaskBtn.addEventListener("click", () => {
    modalMode = "Add"
    DOMController.displayTaskModal("Add", todoManager.projectArr);
    modal.showModal();
})

//handle form event based on current modalMode
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let title = document.getElementById("form-title").value;
    let desc = document.getElementById("form-desc").value;
    let dueDate = document.getElementById("form-date").value;
    let prio = document.getElementById("form-prio").value;
    let projectId = parseInt(document.getElementById("form-project").value);
    let project = todoManager.projectArr.find((project) => project.id === projectId);
    if (modalMode === "Add") {
        todoManager.addTask(project, title, desc, dueDate, prio);
    } else if (modalMode === "Edit") {
        //edit task
    }
    modal.close();
    DOMController.clearTasks();
    displayCurrentView();
})


//project events
//switch project displayed
navDiv.addEventListener("click", (e) => {
    let projectDiv = e.target.closest(".project-div");
    if (projectDiv) {
        let projectId = parseInt(projectDiv.dataset.projectId);
        currentProject = projectId;
        let project = todoManager.projectArr.find((project) => project.id === projectId);
        DOMController.clearTasks();
        DOMController.displayTasks(project);
    }
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