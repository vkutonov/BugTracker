const user = requireUser();
const data = loadData();

renderLayout(data, user, "dashboard");
document.getElementById("welcome").textContent =
  `Welcome back, ${user.name.split(" ")[0]}. Here are the projects you are working on.`;

function countOpenTickets(projectId) {
  return data.tickets.filter(t => t.projectId === projectId && t.status !== "resolved").length;
}

function projectCard(project) {
  return `
    <div class="card project-card">
      <h3>
        ${escapeHtml(project.name)}
        <span class="badge badge-role">${getUserRole(project, user)}</span>
      </h3>
      <p class="muted">${escapeHtml(project.description)}</p>
      <p class="muted meta">
        ${countOpenTickets(project.id)} open tickets · ${project.members.length} members
      </p>
      <div class="footer">
        <span class="muted">Project ID: ${project.id}</span>
        <a href="kanban.html?project=${project.id}">Open Project →</a>
      </div>
    </div>
  `;
}

function renderProjects() {
  const projects = getUserProjects(data, user);
  document.getElementById("projects").innerHTML = projects.map(projectCard).join("");
  document.getElementById("projects-count").textContent = `${projects.length} projects`;
}

function makeProjectId(name) {
  const letters = initials(name).slice(0, 2).padEnd(2, "X");
  const number = String(data.projects.length + 1).padStart(3, "0");
  return `${letters}-${number}`;
}

const createDialog = document.getElementById("create-dialog");
const createForm = document.getElementById("create-form");

document.getElementById("create-open").addEventListener("click", () => {
  createForm.reset();
  clearErrors(createForm);
  createDialog.showModal();
});

createForm.addEventListener("submit", event => {
  event.preventDefault();
  clearErrors(createForm);

  const name = document.getElementById("project-name").value.trim();
  const description = document.getElementById("project-description").value.trim();

  if (!name) {
    showError("project-name-error", "Enter a project name.");
    return;
  }

  const project = {
    id: makeProjectId(name),
    name,
    description,
    owner: user.name,
    members: [{ name: user.name, role: "Owner" }],
    requests: []
  };

  data.projects.push(project);
  saveData(data);
  window.location.href = `kanban.html?project=${project.id}`;
});

const joinDialog = document.getElementById("join-dialog");
const joinForm = document.getElementById("join-form");

document.getElementById("join-open").addEventListener("click", () => {
  joinForm.reset();
  clearErrors(joinForm);
  joinDialog.showModal();
});

joinForm.addEventListener("submit", event => {
  event.preventDefault();
  clearErrors(joinForm);

  const id = document.getElementById("join-id").value.trim().toUpperCase();
  const project = findProject(data, id);

  if (!id) {
    showError("join-error", "Enter a Project ID.");
    return;
  }
  if (data.myRequests.some(request => request.projectId === id)) {
    showError("join-error", "A request is already pending for this project.");
    return;
  }
  if (!project) {
    showError("join-error", "No project found with this ID.");
    return;
  }
  if (getUserRole(project, user)) {
    showError("join-error", "You are already a member of this project.");
    return;
  }

  project.requests.push({ name: user.name, date: today() });
  data.myRequests.push({ projectId: id, projectName: project.name, sent: today() });
  saveData(data);
  window.location.href = "requests.html";
});

renderProjects();
