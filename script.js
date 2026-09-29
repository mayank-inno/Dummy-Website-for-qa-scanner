const EYE =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_OFF =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';

// Intentional bug: the eye icon flips, but the field never changes from password to text.
document.querySelectorAll(".toggle").forEach((button) => {
  button.innerHTML = EYE;
  button.setAttribute("aria-pressed", "false");
  button.addEventListener("click", () => {
    const showing = button.getAttribute("aria-pressed") === "true";
    button.innerHTML = showing ? EYE : EYE_OFF;
    button.setAttribute("aria-pressed", String(!showing));
    button.setAttribute("aria-label", showing ? "Show password" : "Hide password");
  });
});

// Intentional bug: login accepts anything, even empty fields, and goes straight home.
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      sessionStorage.setItem("loginEmail", document.getElementById("login-email").value);
      sessionStorage.setItem("loginPassword", document.getElementById("login-password").value);
    } catch (error) {
      // Storage blocked: the home page will show the values as not available.
    }
    window.location.href = "home.html";
  });
}

const signupForm = document.getElementById("signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById("signup-message").textContent = "Sign up submitted (dummy).";
  });
}

// Home page: show exactly what was typed on the login page.
const enteredEmail = document.getElementById("entered-email");
if (enteredEmail) {
  const show = (id, key) => {
    let value = null;
    try {
      value = sessionStorage.getItem(key);
    } catch (error) {
      value = null;
    }
    const el = document.getElementById(id);
    if (value === null) el.textContent = "(not available)";
    else if (value === "") el.textContent = "(empty)";
    else el.textContent = `"${value}"`; // quotes make spaces-only input visible
  };
  show("entered-email", "loginEmail");
  show("entered-password", "loginPassword");
}
