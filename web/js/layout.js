function renderHeader(user) {
  document.getElementById("header").innerHTML = `
    <div>
      <a class="logo" href="dashboard.html">BugTrack</a>
      <span class="muted logo-hint">Student workspace</span>
    </div>
    <div class="header-user">
      <span class="avatar">${initials(user.name)}</span>
      <span>${escapeHtml(user.name)}</span>
      <button class="btn btn-small" onclick="logout()">Log out</button>
    </div>
  `;
}

function renderSidebar(data, user, activeId) {
  const projects = getUserProjects(data, user);

  const projectLinks = projects
    .map(project => {
      const active = project.id === activeId ? "active" : "";
      return `<a class="sub ${active}" href="kanban.html?project=${project.id}">${escapeHtml(project.name)}</a>`;
    })
    .join("");

  document.getElementById("sidebar").innerHTML = `
    <div class="sidebar-title">Workspace</div>
    <a href="dashboard.html" class="${activeId === "dashboard" ? "active" : ""}">Dashboard</a>
    <a href="dashboard.html">My Projects</a>
    ${projectLinks}
    <a href="requests.html" class="${activeId === "requests" ? "active" : ""}">
      Requests (${data.myRequests.length})
    </a>
  `;
}

function renderLayout(data, user, activeId) {
  renderHeader(user);
  renderSidebar(data, user, activeId);
}
