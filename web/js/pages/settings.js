const user = requireUser();
const data = loadData();
const project = requireProject(data, getParam("project"));

if (getUserRole(project, user) !== "Owner") {
  window.location.href = `kanban.html?project=${project.id}`;
  throw new Error("Only the owner can open settings");
}

function memberRow(member, index) {
  if (member.role === "Owner") {
    return `
      <div class="list-item row">
        <div><span class="avatar">${initials(member.name)}</span> ${escapeHtml(member.name)}</div>
        <span class="badge badge-role">Owner</span>
      </div>
    `;
  }

  const options = ["Developer", "Tester"]
    .map(role => `<option ${role === member.role ? "selected" : ""}>${role}</option>`)
    .join("");

  return `
    <div class="list-item row">
      <div><span class="avatar">${initials(member.name)}</span> ${escapeHtml(member.name)}</div>
      <div class="row">
        <select style="width: auto" onchange="changeRole(${index}, this.value)">${options}</select>
        <button class="btn btn-small btn-danger" onclick="removeMember(${index})">Remove</button>
      </div>
    </div>
  `;
}

function requestRow(request, index) {
  return `
    <div class="list-item">
      <h3>${escapeHtml(request.name)}</h3>
      <p class="muted">Requested ${request.date}</p>
      <div class="row" style="justify-content: flex-start; margin-top: 8px">
        <button class="btn btn-small btn-danger" onclick="rejectRequest(${index})">Reject</button>
        <button class="btn btn-small btn-success" onclick="approveRequest(${index})">Approve</button>
      </div>
    </div>
  `;
}

function render() {
  renderLayout(data, user, project.id);

  document.getElementById("breadcrumbs").textContent = `My Projects / ${project.name} / Settings`;
  document.getElementById("back-link").href = `kanban.html?project=${project.id}`;
  document.getElementById("project-id").textContent = `Project ID: ${project.id}`;
  document.getElementById("name").value = project.name;
  document.getElementById("description").value = project.description;
  document.getElementById("invite-link").value = `https://bugtrack.app/join/${project.id}`;

  document.getElementById("members-title").textContent = `Participants · ${project.members.length} members`;
  document.getElementById("members").innerHTML = project.members.map(memberRow).join("");

  document.getElementById("requests-title").textContent = `Pending Requests · ${project.requests.length}`;
  document.getElementById("requests").innerHTML =
    project.requests.map(requestRow).join("") || `<p class="muted">No pending requests.</p>`;
}

function update() {
  saveData(data);
  render();
}

function changeRole(index, role) {
  project.members[index].role = role;
  update();
}

function removeMember(index) {
  project.members.splice(index, 1);
  update();
}

function approveRequest(index) {
  const request = project.requests.splice(index, 1)[0];
  project.members.push({ name: request.name, role: "Developer" });
  update();
}

function rejectRequest(index) {
  project.requests.splice(index, 1);
  update();
}

document.getElementById("details-form").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();

  if (!name) {
    showError("name-error", "Enter a project name.");
    return;
  }

  showError("name-error", "");
  project.name = name;
  project.description = document.getElementById("description").value.trim();
  update();
});

document.getElementById("copy-button").addEventListener("click", event => {
  navigator.clipboard.writeText(document.getElementById("invite-link").value);
  event.target.textContent = "Copied!";
});

document.getElementById("delete-button").addEventListener("click", () => {
  document.getElementById("delete-dialog").showModal();
});

document.getElementById("delete-confirm").addEventListener("click", () => {
  data.projects = data.projects.filter(item => item.id !== project.id);
  data.tickets = data.tickets.filter(ticket => ticket.projectId !== project.id);
  saveData(data);
  window.location.href = "dashboard.html";
});

render();
