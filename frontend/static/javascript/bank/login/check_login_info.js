function checkLoginInfo() {
  const login_info = {
    username: document.getElementById("input-login-username").value,
    password: document.getElementById("input-login-password").value,
  };
  let login_info_is_null = 1;
  for (let key in login_info) {
    if (!login_info[key]) {
      document.getElementById(
        `login-${key}`
      ).innerHTML += `<div class="login-info-null-warning">
      The ${key} can not be null
      </div>`;
    } else {
      login_info_is_null = 0;
    }
  }
  if (!login_info_is_null) {
    userLogin();
  }
}
