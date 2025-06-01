import "./style.css";
import * as todoManager from "./todoManager.js";
import * as DOMController from "./domController.js"
// import { addDays } from "date-fns";

let allBtn = document.getElementById("all-btn")


let defaultProject = todoManager.addProject("Test Project");
let secondProject = todoManager.addProject("Second Project");
todoManager.addTask(defaultProject, "Test Task", "Description", "2025-06-01", "high");
todoManager.addTask(defaultProject, "Another Task", "Yes", "2025-06-01", "medium");
todoManager.addTask(secondProject, "This Task", "Okay", "2025-06-02", "low")

console.log(todoManager.projectArr);


allBtn.addEventListener("click", () => {
    DOMController.clearTasks();
    DOMController.displayAllTasks(todoManager.projectArr);
})