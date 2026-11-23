const DATA_KEY = "bugtrack-data";
const USER_KEY = "bugtrack-user";

function loadData() {
  const saved = localStorage.getItem(DATA_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function saveData(data) {
  localStorage.setItem(DATA_KEY, JSON.stringify(data));
}

function getCurrentUser() {
  const saved = localStorage.getItem(USER_KEY);
  return saved ? JSON.parse(saved) : null;
}

function setCurrentUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function logout() {
  localStorage.removeItem(USER_KEY);
  window.location.href = "index.html";
}

function requireUser() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "index.html";
    throw new Error("Not signed in");
  }
  return user;
}

function findProject(data, id) {
  return data.projects.find(project => project.id === id);
}

function requireProject(data, id) {
  const project = findProject(data, id);
  if (!project) {
    window.location.href = "dashboard.html";
    throw new Error("Project not found");
  }
  return project;
}

function findTicket(data, id) {
  return data.tickets.find(ticket => ticket.id === id);
}

function getUserProjects(data, user) {
  return data.projects.filter(project =>
    project.members.some(member => member.name === user.name)
  );
}

function getUserRole(project, user) {
  const member = project.members.find(item => item.name === user.name);
  return member ? member.role : "";
}
