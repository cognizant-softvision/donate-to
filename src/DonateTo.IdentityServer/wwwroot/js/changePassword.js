function CheckPasswordCriteria(passwordValue) {
  const passwordElement = document.getElementById("newPassword");
  const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/);

  if (passwordRegex.test(passwordValue)) {
    passwordElement.classList.remove("is-invalid");
    passwordElement.classList.add("is-valid");
  } else {
    passwordElement.classList.remove("is-valid");
    passwordElement.classList.add("is-invalid");
  }
}

function CheckPasswordMatch(confirmPasswordValue) {
  const passwordValue = document.getElementById("newPassword").value;
  const confirmPasswordElement = document.getElementById("confirmNewPassword");

  if (confirmPasswordValue === passwordValue) {
    confirmPasswordElement.classList.remove("is-invalid");
    confirmPasswordElement.classList.add("is-valid");
  } else {
    confirmPasswordElement.classList.remove("is-valid");
    confirmPasswordElement.classList.add("is-invalid");
  }
}
