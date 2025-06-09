export { saveProjectsToStorage, getProjectsFromStorage } 

function saveProjectsToStorage(projects) {
    let projectsString = JSON.stringify(projects);
    localStorage.setItem("projects", projectsString);
}

function getProjectsFromStorage() {
    let projectsString = localStorage.getItem("projects");
    let projectsArr = JSON.parse(projectsString);
    return projectsArr;
}