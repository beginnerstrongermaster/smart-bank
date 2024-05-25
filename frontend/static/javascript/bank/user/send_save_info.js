function sendSaveInfo() {
  const user_url = "http://127.0.0.1:8000/auth/users/me/";
  const user_profile_url = "http://127.0.0.1:8000/bank/customers/profile/";
  const avatar_url = "http://127.0.0.1:8000/bank/avatars/";

  const auth_saved = 0;
  const profile_saved = 0;
  const avatar_changed = 0;

  const authRequestOption = {
    method: "PUT",
    headers: {
      Authorization: `token ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    //set auth modification body
    body: JSON.stringify({
      email: document.getElementById("input-email").value,
      phone: document.getElementById("input-phone").value,
      first_name: document.getElementById("input-first-name").value,
      last_name: document.getElementById("input-last-name").value,
    }),
  };
  const profileRequestOption = {
    method: "PUT",
    headers: {
      Authorization: `token ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    //set profile modification body
    body: JSON.stringify({
      birthday: document.getElementById("input-birthday").value,
      address: document.getElementById("input-address").value,
      city: document.getElementById("input-city").value,
      region: document.getElementById("select-regions").value,
      postcode: document.getElementById("input-postcode").value,
    }),
  };

  //FormData function will automatically match key value pairs
  let formData = new FormData();
  const image = document.getElementById("input-user-avatar");
  //Image does not only have the file, but also it has name, size, etc that we need to send back
  // You can not send Image field with
  formData.append("avatar", image.files[0]);
  const avatarRequestOption = {
    method: "POST",
    headers: {
      Authorization: `token ${sessionStorage.getItem("token")}`,
    },
    body: formData,
  };
  //send put request to users/me
  fetch(user_url, authRequestOption)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  //send put request to user profile
  fetch(user_profile_url, profileRequestOption)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  //send request to avatar
  fetch(avatar_url, avatarRequestOption)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Avatar Data:", data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
