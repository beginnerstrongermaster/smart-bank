function passwordCheck() {
  //get password and confirm password
  const password = document.getElementById("input-signup-password").value;
  const confirm_password = document.getElementById(
    "input-signup-confirm-password"
  ).value;

  //create a new div
  warning_div = document.createElement("div");
  warning_div.innerText = "Passwords do not match";
  warning_div.className = "password-warning";

  //set the element that under the tag we are going to insert
  under_element = document.getElementById("signup-body");
  if (password !== confirm_password) {
    // get the parent node to insert a new div before a child div
    under_element.parentNode.insertBefore(warning_div, under_element);
  } else {
    signupInfoCheck();
  }
}
