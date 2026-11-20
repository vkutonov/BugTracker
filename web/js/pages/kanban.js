const user = requireUser();
const data = loadData();
const project = requireProject(data, getParam("project"));

const priorityFilter = document.getElementById("priority-filter");
const assigneeFilter = document.getElementById("assignee-filter");

function fillHeader() {
  renderLayout(data, user, project.id);

  document.title = `BugTrack · ${project.name}`;
  document.getElementById("breadcrumbs").textContent = `My Projects / ${project.name} / Kanban`;
  document.getElementById("project-name").textContent = project.name;
  document.getElementById("project-description").textContent = project.description;
  document.getElementById("create-link").href = `ticket-form.html?project=${project.id}`;
  document.getElementById("settings-link").href = `settings.html?project=${project.id}`;

  if (getUserRole(project, user) !== "Owner") {
    document.getElementById("settings-link").hidden = true;
  }

  project.members.forEach(member => {
    assigneeFilter.innerHTML += `<option>${escapeHtml(member.name)}</option>`;
  });
}

function ticketCard(ticket) {
  return `
    <a class="ticket-card" href="ticket.html?id=${ticket.id}">
      <span class="muted">${ticket.id}</span>
      <p>${escapeHtml(ticket.title)}</p>
      ${priorityBadge(ticket.priority)}
      <div class="muted" style="margin-top: 8px">${escapeHtml(ticket.assignee || "Unassigned")}</div>
    </a>
  `;
}

function column(status, tickets) {
  const cards = tickets.map(ticketCard).join("") || `<p class="muted">No tickets</p>`;
  return `
    <div class="column column-${status.key}">
      <div class="column-head">
        <div class="row"><h3>${status.title}</h3><span class="muted">${tickets.length}</span></div>
        <span class="muted">${status.hint}</span>
      </div>
      ${cards}
    </div>
  `;
}

function getFilteredTickets() {
  return data.tickets.filter(ticket =>
    ticket.projectId === project.id &&
    (!priorityFilter.value || ticket.priority === priorityFilter.value) &&
    (!assigneeFilter.value || ticket.assignee === assigneeFilter.value)
  );
}

function renderBoard() {
  const tickets = getFilteredTickets();

  document.getElementById("kanban").innerHTML = STATUSES
    .map(status => column(status, tickets.filter(ticket => ticket.status === status.key)))
    .join("");
  document.getElementById("tickets-count").textContent = `${tickets.length} tickets`;
}

priorityFilter.addEventListener("change", renderBoard);
assigneeFilter.addEventListener("change", renderBoard);

fillHeader();
renderBoard();
