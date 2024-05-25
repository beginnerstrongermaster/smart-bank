const user_create_url = "http://127.0.0.1:8000/auth/users/";
function sendSignUpInfo() {
  const signupRequestOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: document.getElementById("input-signup-username").value,
      email: document.getElementById("input-signup-email").value,
      password: document.getElementById("input-signup-password").value,
      phone: document.getElementById("input-signup-phone").value,
    }),
  };
  fetch(user_create_url, signupRequestOption)
    .then((response) => {
      if (!response.ok) {
        // If some fields get duplicated, we pop up a warning
        response.json().then((resultObject) => {
          for (key in resultObject) {
            document.getElementById(
              `signup-${key}`
            ).innerHTML += `<div class="signup-backend-warning">${resultObject[key]}</div>`;
          }
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Sign up data:", data);
      //If response is ok, we return a successful message
      let signup_success_div = document.createElement("div");
      signup_success_div.innerText = `Sign Up successfully`;
      signup_success_div.className = "signup-success-warning";
      under_element = document.getElementById("signup-body");
      under_element.parentNode.insertBefore(signup_success_div, under_element);
      // give a redirecting notification
      document.getElementById(
        "signup"
      ).innerHTML += ` <div class="redirect-warning">Redirecting...</div>`;
      setTimeout(() => {
        window.location.href = "login.html";
      }, 3000);
    })
    .catch((error) => {
      console.log(
        "There was a problem with the fetch operation: " + error.message
      );
    });
}
