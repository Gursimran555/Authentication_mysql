function toggleForm() {
  var loginForm = document.getElementById("login-form");
  var signupForm = document.getElementById("signup-form");
  var toggleBtn = document.getElementById("toggle-btn");

  if (loginForm.style.display === "none") {
      loginForm.style.display = "block";
      signupForm.style.display = "none";
      toggleBtn.textContent = "Login / Sign Up";
  } else {
      loginForm.style.display = "none";
      signupForm.style.display = "block";
      toggleBtn.textContent = "Back to Login";
  }
}
// no script is needed for login or sigup . this is only for button of signin and signup