// Show/hide toggle for every password field on the page.
document.querySelectorAll(".toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.target);
    const showing = input.type === "text";
    input.type = showing ? "password" : "text";
    button.textContent = showing ? "Show" : "Hide";
    button.setAttribute("aria-pressed", String(!showing));
  });
});

// Dummy submit handlers: no real validation or backend.
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById("login-message").textContent = "Login submitted (dummy).";
  });
}

const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById("signup-message").textContent = "Sign up submitted (dummy).";
  });
}
