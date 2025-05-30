import "./style.css";
import { addDays } from 'date-fns';
import { Task, Project, addTask, editTask, deleteTask } from "./todo";



let task1 = new Task("Brush teeth", "", new Date(), "medium");
let task2 = new Task("Walk dog", "15 minutes", addDays(new Date(), 1), "high");
let task3 = new Task("Make bed", "wash and change sheets", addDays(new Date(), 5), "low");
let project1 = new Project("default project");
project1.tasks.push(task1, task2, task3);




addTask(project1, "workout", "lift weights and do 20 minutes of cardio", new Date(), "high");
editTask(project1, 1, "description", "remember to floss");
deleteTask(project1, 2);



project1.tasks.forEach(task => {
    console.log(task);
});