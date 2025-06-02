import "./style.css";
import * as todoManager from "./todoManager.js";
import * as DOMController from "./domController.js"
import { format, addDays } from "date-fns";

//create default project
let defaultProject = todoManager.addProject("Test Project");

//placeholder projects + tasks for testing 
let secondProject = todoManager.addProject("Second Project");
let thirdProject = todoManager.addProject("Third Project")
todoManager.addTask(defaultProject, "Test Task", "Description", format(new Date(), "yyyy-MM-dd"), "high");
todoManager.addTask(defaultProject, "Another Task", "Yes", format(new Date(), "yyyy-MM-dd"), "medium");
todoManager.addTask(secondProject, "This Task", "Okay", format(addDays(new Date(), 2), "yyyy-MM-dd"), "low");
todoManager.addTask(thirdProject, "Yet Another Task", "", format(addDays(new Date(), 8), "yyyy-MM-dd"), "medium");

//display all tasks and projects on page load
DOMController.displayAllTasks(todoManager.projectArr);
DOMController.displayProjects(todoManager.projectArr);

//dom elements
let contentDiv = document.getElementById("content");
let navDiv = document.getElementById("nav");

let addTaskBtn = document.getElementById("add-task-btn");
let allBtn = document.getElementById("all-btn");
let todayBtn = document.getElementById("today-btn");
let weekBtn = document.getElementById("week-btn");


//track last clicked navigation tab when user edits/deletes a task
let currentView = "all";
let currentProject = null;

//display the current view/project after task edit
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


//nav events
//add task

//all tasks
allBtn.addEventListener("click", () => {
    DOMController.clearTasks();
    DOMController.displayAllTasks(todoManager.projectArr);
    currentView = "all";
    currentProject = null;
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

//add project


//edit project


//delete project


//task events
//edit

//delete
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