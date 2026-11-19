const DEFAULT_DATA = {
  users: [
    { name: "Alex Johnson", email: "alex.johnson@student.dev", password: "password123" }
  ],
  projects: [
    {
      id: "TF-001",
      name: "TaskForge",
      description: "Task management platform for teams",
      owner: "Alex Johnson",
      members: [
        { name: "Alex Johnson", role: "Owner" },
        { name: "Sam Miller", role: "Developer" },
        { name: "Jane Smith", role: "Tester" },
        { name: "Michael Lee", role: "Developer" },
        { name: "Emma Wilson", role: "Tester" }
      ],
      requests: [
        { name: "Sarah Davis", date: "7 Oct 2026" },
        { name: "Mike Brown", date: "7 Oct 2026" }
      ]
    },
    {
      id: "FT-002",
      name: "Fitness Tracker Mobile",
      description: "Mobile app for activity and fitness tracking",
      owner: "Sam Miller",
      members: [
        { name: "Sam Miller", role: "Owner" },
        { name: "Alex Johnson", role: "Developer" }
      ],
      requests: []
    },
    {
      id: "EC-003",
      name: "Ecommerce Platform",
      description: "Online store and checkout experience",
      owner: "Emma Wilson",
      members: [
        { name: "Emma Wilson", role: "Owner" },
        { name: "Alex Johnson", role: "Tester" }
      ],
      requests: []
    }
  ],
  myRequests: [
    { projectId: "FP-005", projectName: "FinalPaper", sent: "7 Oct 2026, 09:00" },
    { projectId: "TW-006", projectName: "Teamwork", sent: "6 Oct 2026, 15:30" }
  ],
  tickets: [
    {
      id: "BUG-024",
      projectId: "TF-001",
      title: "The confirm button is not working",
      description: "The Confirm button does not submit the form when all fields are filled in. No success message appears and the dialog remains open.",
      steps: "Open the participant assignment dialog.\nSelect Developer.\nClick Confirm.\nThe dialog remains open, the participant is not added.",
      priority: "High",
      status: "open",
      author: "Jane Smith",
      assignee: "",
      created: "7 Oct 2026"
    },
    {
      id: "BUG-026",
      projectId: "TF-001",
      title: "Search returns duplicate results",
      description: "Searching by ticket title shows the same ticket twice.",
      steps: "Open the search.\nType any title.\nSee duplicates.",
      priority: "Medium",
      status: "open",
      author: "Emma Wilson",
      assignee: "",
      created: "8 Oct 2026"
    },
    {
      id: "BUG-018",
      projectId: "TF-001",
      title: "Dashboard does not refresh",
      description: "New projects appear only after reloading the page.",
      steps: "Create a project.\nReturn to the dashboard.",
      priority: "High",
      status: "progress",
      author: "Jane Smith",
      assignee: "Sam Miller",
      created: "5 Oct 2026"
    },
    {
      id: "BUG-017",
      projectId: "TF-001",
      title: "Password reset email is not delivered",
      description: "The reset email never arrives.",
      steps: "Click Forgot password.\nEnter email.\nWait.",
      priority: "High",
      status: "review",
      author: "Emma Wilson",
      assignee: "Sam Miller",
      created: "4 Oct 2026"
    },
    {
      id: "BUG-015",
      projectId: "TF-001",
      title: "Login page redirects to a blank page",
      description: "After login the user sees an empty page.",
      steps: "Sign in with valid credentials.",
      priority: "High",
      status: "resolved",
      author: "Jane Smith",
      assignee: "Alex Johnson",
      created: "2 Oct 2026"
    }
  ]
};

const STATUSES = [
  { key: "open", title: "Open", hint: "Ready to be taken" },
  { key: "progress", title: "In Progress", hint: "Currently being worked on" },
  { key: "review", title: "In Review", hint: "Ready for testing" },
  { key: "resolved", title: "Resolved", hint: "Done" }
];

const STATUS_ACTIONS = {
  open: [{ label: "Take into work", to: "progress" }],
  progress: [{ label: "Send to review", to: "review" }],
  review: [
    { label: "Mark as resolved", to: "resolved" },
    { label: "Return to open", to: "open" }
  ],
  resolved: []
};
