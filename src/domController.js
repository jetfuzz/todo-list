export { 
    clearTasks, displayTasks, displayTodayTasks, displayWeekTasks, displayAllTasks, setTaskCompleteStyle, clearProjects, displayProjects, displayTaskModal, displayProjectModal 
};

import editSvg from "./images/edit-2-svgrepo-com.svg";
import deleteSvg from "./images/delete-svgrepo-com.svg";
import projectSvg from "./images/task-list-svgrepo-com.svg";
import { format, addDays, eachDayOfInterval } from "date-fns"

function clearTasks() {
    let contentDiv = document.getElementById("content");
    let existingTasks = contentDiv.querySelectorAll('.task');
    existingTasks.forEach(task => task.remove());
}

function createTaskElement(task, project) {
    let taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.dataset.taskId = task.id;
    taskDiv.dataset.projectId = project.id;
    setTaskPriorityColor(task.priority, taskDiv, "borderLeftColor")

    let taskCheckbox = document.createElement("input");
    taskCheckbox.className = "task-checkbox";
    taskCheckbox.type = "checkbox";
    setTaskPriorityColor(task.priority, taskCheckbox, "accentColor")

    let taskTitle = document.createElement("p");
    taskTitle.className = "task-title";
    taskTitle.innerHTML = task.title;

    let taskOptions = document.createElement("div");
    taskOptions.className = "task-options";

    let taskDate = document.createElement("p");
    taskDate.className = "task-date";
    taskDate.innerHTML = task.dueDate;

    let taskEdit = document.createElement("img");
    taskEdit.className = "task-edit";
    taskEdit.src = editSvg;

    let taskDelete = document.createElement("img");
    taskDelete.className = "task-delete";
    taskDelete.src = deleteSvg;

    taskOptions.appendChild(taskDate);
    taskOptions.appendChild(taskEdit);
    taskOptions.appendChild(taskDelete);
    taskDiv.appendChild(taskCheckbox);
    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(taskOptions);
    return taskDiv;
}

function displayTasks(project) {
    let contentDiv = document.getElementById("content");
    project.tasks.forEach(task => {
        
        let taskDiv = createTaskElement(task, project);;
        contentDiv.appendChild(taskDiv);
    });
}

function displayTodayTasks(projects) {
    let contentDiv = document.getElementById("content");
    let today = format(new Date(), "yyyy-MM-dd");
    projects.forEach(project => {
        project.tasks.forEach(task => {
            if (task.dueDate === today) {
                let taskDiv = createTaskElement(task, project);
                contentDiv.appendChild(taskDiv);
            }
        })
    });
}

function displayWeekTasks(projects) {
    let contentDiv = document.getElementById("content");
    const thisWeek = eachDayOfInterval({
        start: new Date(),
        end: addDays(new Date(), 7)
    })

    projects.forEach(project => {
        project.tasks.forEach(task => {
            thisWeek.forEach(day => {
                if (task.dueDate === format(day, "yyyy-MM-dd")) {
                    let taskDiv = createTaskElement(task, project);
                    contentDiv.appendChild(taskDiv);
                }
            })
        })
    });
}

function displayAllTasks(projects) {
    projects.forEach(project => {
        displayTasks(project);
    });
}

function setTaskPriorityColor(priority, element, property) {
    if (priority === "high") {
        element.style[property]="#dc2626";
    } else if (priority === "medium") {
        element.style[property]="#d97706";
    } else if (priority === "low") {
        element.style[property]="#10b981";
    } else {
        element.style[property]="#ddd";
    }
}

function setTaskCompleteStyle(taskDiv, isCompleted) {
    let title = taskDiv.querySelector(".task-title")
    let checkbox = taskDiv.querySelector(".task-checkbox");

    if (!isCompleted) {
        title.style.textDecoration = "none";
        title.style.color = "black";
        checkbox.checsked = false;
    } else {
        title.style.textDecoration = "line-through";
        title.style.color = "#9ca3af";
        checkbox.checked = true;
    }
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

        let projectIcon = document.createElement("img");
        projectIcon.className = "project-icon";
        projectIcon.src = projectSvg;

        let projectBtn = document.createElement("button");
        projectBtn.className = "project-btn";
        projectBtn.innerHTML = `${project.name}`

        let projectInfo = document.createElement("div");
        projectInfo.className = "project-info";

        let projectEdit = document.createElement("img");
        projectEdit.className = "project-edit";
        projectEdit.src = editSvg;

        let projectDelete = document.createElement("img");
        projectDelete.className = "project-delete";
        projectDelete.src = deleteSvg;

        projectInfo.appendChild(projectEdit);
        projectInfo.appendChild(projectDelete);
        projectDiv.appendChild(projectIcon);
        projectDiv.appendChild(projectBtn);
        projectDiv.appendChild(projectInfo);
        nav.appendChild(projectDiv);
    });
}

function displayTaskModal(action, projects) {
    let form = document.getElementById("modal-form");
    let modalTitle = document.getElementById("modal-title");
    modalTitle.textContent = `${action} Task`

    let projectsHTML = "";
    projects.forEach(project => {
        projectsHTML += `<option value="${project.id}">${project.name}</option>`;
    })

    form.innerHTML = `
        <label for="form-title">Title *</label>
        <input type="text" name="form-title" id="form-title" placeholder="Enter task title" required>

        <label for="form-desc">Description</label>
        <textarea type="text" name="form-desc" id="form-desc" placeholder="Enter task description (optional)" rows="3"></textarea>

        <div class="form-row">
            <div class="form-group">
                <label for="form-date">Due Date</label>
                <input type="date" name="form-date" id="form-date" required>
            </div>
            <div class="form-group">
                <label for="form-prio">Priority</label>
                <select name="form-prio" id="form-prio" autocomplete="off">
                     <option value="high">High</option>
                    <option value="medium" selected>Medium</option>
                    <option value="low">Low</option>
                </select>
            </div>
        </div>

        <label for="form-project">Project</label>
        <select name="form-project" id="form-project" required>
        ${projectsHTML}
        </select>
        <hr>
        <div class="form-actions">
            <button type="button" id="modal-cancel" class="modal-close">Cancel</button>
            <button type="submit" id="modal-${action}" class="modal-submit">${action}</button>
        </div>
    `;
}

function displayProjectModal(action) {
    let form = document.getElementById("modal-form");
    let modalTitle = document.getElementById("modal-title");
    modalTitle.textContent = `${action} Project`
    form.innerHTML = `
        <label for="form-title">Name *</label>
        <input type="text" name="form-title" id="form-title" placeholder="Enter project title" required>
        <hr>
        <div class="form-actions">
            <button type="button" id="modal-cancel" class="modal-close">Cancel</button>
            <button type="submit" id="modal-${action}" class="modal-submit">${action}</button>
        </div>
    `
}