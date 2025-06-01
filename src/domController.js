export { clearTasks, displayTasks, displayAllTasks };
import editSvg from "./images/edit-3-svgrepo-com.svg";
import deleteSvg from "./images/trash-svgrepo-com.svg";

function clearTasks() {
    let contentDiv = document.getElementById("content");
    let existingTasks = contentDiv.querySelectorAll('.task');
    existingTasks.forEach(task => task.remove());
}

function displayTasks(project) {
    let contentDiv = document.getElementById("content");

    project.tasks.forEach(task => {
        let taskDiv = document.createElement("div");
        taskDiv.className = "task";

        let taskCheckbox = document.createElement("div");
        taskCheckbox.className = "task-checkbox";

        let taskTitle = document.createElement("p");
        taskTitle.className = "task-title";
        taskTitle.innerHTML = task.title;

        let taskInfo = document.createElement("div");
        taskInfo.className = "task-info";

        let taskDate = document.createElement("p");
        taskDate.className = "task-date";
        taskDate.innerHTML = task.dueDate;

        let taskEdit = document.createElement("img");
        taskEdit.className = "task-edit";
        taskEdit.src = editSvg;

        let taskDelete = document.createElement("img");
        taskDelete.className = "task-delete";
        taskDelete.src = deleteSvg;

        taskInfo.appendChild(taskDate);
        taskInfo.appendChild(taskEdit);
        taskInfo.appendChild(taskDelete);

        taskDiv.appendChild(taskCheckbox);
        taskDiv.appendChild(taskTitle);
        taskDiv.appendChild(taskInfo);

        contentDiv.appendChild(taskDiv);
    });
}

function displayAllTasks(projects) {
    projects.forEach(project => {
        displayTasks(project);
    });
}