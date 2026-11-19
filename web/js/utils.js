function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function initials(name) {
  return name
    .split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase();
}

function priorityBadge(priority) {
  return `<span class="badge badge-${priority.toLowerCase()}">${priority}</span>`;
}

function today() {
  return new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function showError(id, message) {
  document.getElementById(id).textContent = message;
}

function clearErrors(form) {
  form.querySelectorAll(".error").forEach(item => (item.textContent = ""));
  form.querySelectorAll(".invalid").forEach(item => item.classList.remove("invalid"));
}
