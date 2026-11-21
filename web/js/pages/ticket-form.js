const user = requireUser();
const data = loadData();
const editedTicket = findTicket(data, getParam("id"));
const projectId = editedTicket ? editedTicket.projectId : getParam("project");
const project = requireProject(data, projectId);

const form = document.getElementById("ticket-form");
const fields = ["title", "description", "steps", "priority"];

function fillPage() {
  renderLayout(data, user, project.id);

  document.getElementById("form-project").textContent = `Project: ${project.name}`;
  document.getElementById("breadcrumbs").textContent = `My Projects / ${project.name} / Ticket`;

  if (editedTicket) {
    document.getElementById("form-title").textContent = `Edit ${editedTicket.id}`;
    document.getElementById("cancel-link").href = `ticket.html?id=${editedTicket.id}`;
    fields.forEach(field => (document.getElementById(field).value = editedTicket[field]));
  } else {
    document.getElementById("cancel-link").href = `kanban.html?project=${project.id}`;
  }
}

function readForm() {
  const values = {};
  fields.forEach(field => (values[field] = document.getElementById(field).value.trim()));
  return values;
}

function makeTicketId() {
  const numbers = data.tickets.map(ticket => Number(ticket.id.split("-")[1]));
  const next = Math.max(0, ...numbers) + 1;
  return `BUG-${String(next).padStart(3, "0")}`;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  clearErrors(form);

  const values = readForm();
  let valid = true;

  if (!values.title) {
    showError("title-error", "Enter a title.");
    valid = false;
  }
  if (!values.description) {
    showError("description-error", "Enter a description.");
    valid = false;
  }
  if (!valid) {
    return;
  }

  let ticket = editedTicket;
  if (!ticket) {
    ticket = {
      id: makeTicketId(),
      projectId: project.id,
      status: "open",
      author: user.name,
      assignee: "",
      created: today()
    };
    data.tickets.push(ticket);
  }

  Object.assign(ticket, values);
  saveData(data);
  window.location.href = `ticket.html?id=${ticket.id}`;
});

fillPage();
