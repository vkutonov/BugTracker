const signInForm = document.getElementById("signin-form");
const signUpForm = document.getElementById("signup-form");

signInForm.addEventListener("submit", event => {
  event.preventDefault();
  clearErrors(signInForm);

  const email = document.getElementById("signin-email").value.trim();
  const password = document.getElementById("signin-password").value;

  const data = loadData();
  const user = data.users.find(item => item.email === email && item.password === password);

  if (!user) {
    showError("signin-error", "Incorrect email or password");
    return;
  }

  setCurrentUser({ name: user.name, email: user.email });
  window.location.href = "dashboard.html";
});

signUpForm.addEventListener("submit", event => {
  event.preventDefault();
  clearErrors(signUpForm);

  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const passwordInput = document.getElementById("signup-password");
  const password = passwordInput.value;

  const data = loadData();
  let valid = true;

  if (!name) {
    showError("signup-name-error", "Enter your name");
    valid = false;
  }

  if (!email.includes("@")) {
    showError("signup-email-error", "Enter a valid email");
    valid = false;
  } else if (data.users.some(item => item.email === email)) {
    showError("signup-email-error", "This email is already registered");
    valid = false;
  }

  if (password.length < 8) {
    showError("signup-password-error", "At least 8 characters");
    passwordInput.classList.add("invalid");
    valid = false;
  }

  if (!valid) {
    return;
  }

  data.users.push({ name, email, password });
  saveData(data);
  setCurrentUser({ name, email });
  window.location.href = "dashboard.html";
});
