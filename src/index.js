import "./style.css";
import * as todoManager from './todoManager.js';
import { addDays } from 'date-fns';


let project = todoManager.addProject("Test Project");
todoManager.addTask(project, "Test Task", "Description", "2025-06-01", "high");
console.log(project);

todoManager.editTask(project, 1, "priority", "medium");
console.log(project.tasks[0]);