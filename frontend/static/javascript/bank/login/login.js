function userLogin() {
  const login_url = "http://127.0.0.1:8000/auth/token/login";
  const loginRequestOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: document.getElementById("input-login-username").value,
      password: document.getElementById("input-login-password").value,
    }),
  };
  fetch(login_url, loginRequestOption)
    .then((response) => {
      if (!response.ok) {
        //return error message
        response.json().then((resultObject) => {
          for (let key in resultObject) {
            document.getElementById(
              "login-notification"
            ).innerHTML = `<div class="login-warning" id="login-warning">${resultObject[key]}</div>`;
          }
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Login data:", data);
      const token = data["auth_token"];
      sessionStorage.setItem("token", token);
      // Display user's token
      document.getElementById(
        "login-notification"
      ).innerHTML = `<div class="login-token">Your login token is <b>${token}</b></div>
      <div class="redirect-warning">Redirecting...</div>`;
      setTimeout(() => {
        window.location.href = "../home.html";
      }, 4000);
    })
    .catch((error) => {
      console.log(
        "There was a problem with the fetch operation: " + error.message
      );
    });
}
