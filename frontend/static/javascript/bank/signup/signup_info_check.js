function signupInfoCheck() {
  let signup_info_is_null = 1;
  //get all values
  keys = ["username", "email", "password", "confirm-password", "phone"];
  for (key of keys) {
    ele = document.getElementById(`input-signup-${key}`);
    parent_class = document.getElementById(`signup-${key}`);
    if (!ele.value) {
      parent_class.innerHTML += `<div class="not-null-warning">The ${key} can not be null</div>`;
    } else {
      signup_info_is_null = 0;
    }
  }
  if (!signup_info_is_null) {
    sendSignUpInfo();
  }
}
