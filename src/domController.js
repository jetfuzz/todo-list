export { clearTasks, displayTasks, displayAllTasks, clearProjects, displayProjects, displayTaskModal };
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

function displayTaskModal(action, projects) {
    let form = document.getElementById("modal-form");
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
        <select name="form-project" id="form-project">
        ${projectsHTML}
        </select>
        <hr>
        <div class="modal-actions">
            <button type="button" id="modal-cancel" class="modal-close">Cancel</button>
            <button type="submit" id="modal-${action}" class="modal-submit">${action}</button>
        </div>
    `;
}