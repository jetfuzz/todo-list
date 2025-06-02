export { clearTasks, displayTasks, displayAllTasks, clearProjects, displayProjects };
import editSvg from "./images/edit-2-svgrepo-com.svg";
import deleteSvg from "./images/delete-svgrepo-com.svg";

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
        taskDiv.dataset.taskId = task.id;
        taskDiv.dataset.projectId = project.id;

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

function clearProjects() {
    let nav = document.getElementById("nav");
    let existingProjects = nav.querySelectorAll('.project-div');
    existingProjects.forEach(project => project.remove())
}

function  displayProjects(projects) {
    let nav = document.getElementById("nav");
    projects.forEach(project => {
        let projectDiv = document.createElement("div");
        projectDiv.className = "project-div";
        projectDiv.dataset.projectId = project.id;

        let projectBtn = document.createElement("button");
        projectBtn.className = "project-btn";
        projectBtn.innerHTML = `# ${project.name}`

        let projectInfo = document.createElement("div");
        projectInfo.className = "task-info";

        let projectEdit = document.createElement("img");
        projectEdit.className = "task-edit";
        projectEdit.src = editSvg;

        let projectDelete = document.createElement("img");
        projectDelete.className = "task-delete";
        projectDelete.src = deleteSvg;

        projectInfo.appendChild(projectEdit);
        projectInfo.appendChild(projectDelete);
        projectDiv.appendChild(projectBtn);
        projectDiv.appendChild(projectInfo);
        nav.appendChild(projectDiv);
    });
}