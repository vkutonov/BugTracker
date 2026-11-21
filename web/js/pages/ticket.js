const user = requireUser();
const data = loadData();
const ticket = findTicket(data, getParam("id"));

if (!ticket) {
  window.location.href = "dashboard.html";
  throw new Error("Ticket not found");
}

const project = requireProject(data, ticket.projectId);
const confirmDialog = document.getElementById("confirm-dialog");
let pendingStatus = null;

function statusTitle(key) {
  return STATUSES.find(status => status.key === key).title;
}

function setText(id, text) {
  document.getElementById(id).textContent = text;
}

function renderSteps() {
  document.getElementById("ticket-steps").innerHTML = ticket.steps
    .split("\n")
    .filter(step => step.trim())
    .map(step => `<li>${escapeHtml(step)}</li>`)
    .join("");
}

function renderActions() {
  const buttons = STATUS_ACTIONS[ticket.status].map(action =>
    `<button class="btn btn-primary" onclick="askStatus('${action.to}', '${action.label}')">${action.label}</button>`
  );
  buttons.push(`<a class="btn" style="text-align: center" href="ticket-form.html?id=${ticket.id}">Edit Ticket</a>`);
  document.getElementById("ticket-actions").innerHTML = buttons.join("");
}

function render() {
  renderLayout(data, user, project.id);

  document.title = `BugTrack · ${ticket.id}`;
  setText("breadcrumbs", `My Projects / ${project.name} / ${ticket.id}`);
  setText("ticket-title", ticket.title);
  setText("ticket-meta", `${ticket.id} · Created ${ticket.created} by ${ticket.author}`);
  setText("ticket-description", ticket.description);
  setText("ticket-status", statusTitle(ticket.status));
  setText("ticket-author", ticket.author);
  setText("ticket-assignee", ticket.assignee || "Unassigned");
  setText("ticket-created", ticket.created);
  document.getElementById("ticket-priority").innerHTML = priorityBadge(ticket.priority);
  document.getElementById("back-link").href = `kanban.html?project=${project.id}`;

  renderSteps();
  renderActions();
}

function askStatus(status, label) {
  pendingStatus = status;
  setText("confirm-title", `${label}?`);
  setText("confirm-text", `Ticket ${ticket.id} will move to "${statusTitle(status)}".`);
  confirmDialog.showModal();
}

document.getElementById("confirm-ok").addEventListener("click", () => {
  ticket.status = pendingStatus;
  if (pendingStatus === "progress") {
    ticket.assignee = user.name;
  }
  saveData(data);
  confirmDialog.close();
  render();
});

render();
