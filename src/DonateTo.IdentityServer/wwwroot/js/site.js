// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function CheckPasswordCriteria(passwordValue) {
  const element = document.getElementById("password");
  const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/);

  if (passwordRegex.test(passwordValue)) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}

function CheckPasswordMatch(confirmPasswordValue) {
  const passwordValue = document.getElementById("password").value;
  const element = document.getElementById("confirmPassword");

  if (confirmPasswordValue === passwordValue) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
  }
}
