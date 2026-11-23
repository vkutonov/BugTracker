const user = requireUser();
const data = loadData();

function requestRow(request, index) {
  return `
    <div class="list-item row">
      <div>
        <h3>${escapeHtml(request.projectName)}</h3>
        <p class="muted">Project ID: ${request.projectId}</p>
        <p class="muted">Sent ${request.sent}</p>
      </div>
      <div>
        <span class="badge badge-pending">Pending approval</span>
        <button class="btn btn-small" onclick="cancelRequest(${index})">Cancel</button>
      </div>
    </div>
  `;
}

function render() {
  renderLayout(data, user, "requests");

  const list = document.getElementById("requests");
  if (data.myRequests.length === 0) {
    list.innerHTML = `<p class="list-item">No pending requests.</p>`;
    return;
  }
  list.innerHTML = data.myRequests.map(requestRow).join("");
}

function cancelRequest(index) {
  const request = data.myRequests[index];
  const project = findProject(data, request.projectId);

  if (project) {
    project.requests = project.requests.filter(item => item.name !== user.name);
  }
  data.myRequests.splice(index, 1);
  saveData(data);
  render();
}

render();
