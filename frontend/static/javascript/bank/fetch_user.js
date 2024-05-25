const customer_url = "http://127.0.0.1:8000/bank/customers/profile/";
fetch(customer_url, {
  headers: {
    Authorization: `token ${sessionStorage.getItem("token")}`,
  },
})
  .then((response) => {
    if (!response.ok) {
      document.getElementById(
        "main-body"
      ).innerHTML = `<div class="authorization-warning">
      <h1>You have not pass any authentication yet,<a href="auth/login.html" >Log in here</a></h1>
      </div>`;
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Data received:", data);
    //get username
    const username = data["username"];

    //set username to what we got from backend
    document.getElementById("username").innerHTML = username;

    //If avatar is null, we set avatar username to backend username's first two letters in uppercase
    if (!data["avatar"]) {
      document.getElementById("username-initials").innerHTML = username
        .substr(0, 2)
        .toUpperCase();
    }
    //If customer's avatar is not null, set it to be the avatar
    else {
      const avatar_url = "http://127.0.0.1:8000/media/" + data["avatar"];
      console.log(avatar_url);
      document.getElementById(
        "avatar"
      ).innerHTML = `<img class="avatar-image" src=${avatar_url}>`;
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
