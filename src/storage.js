export { saveProjectsToStorage, getProjectsFromStorage };

function saveProjectsToStorage(projects) {
  let projectsString = JSON.stringify(projects);
  localStorage.setItem("projects", projectsString);
}

function getProjectsFromStorage() {
  let projectsString = localStorage.getItem("projects");
  if (localStorage.getItem("projects") === null) {
    return [];
  } else {
    let projectsArr = JSON.parse(projectsString);
    return projectsArr;
  }
}
