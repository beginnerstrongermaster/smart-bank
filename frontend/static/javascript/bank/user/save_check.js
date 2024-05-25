function saveInfoCheck() {
  let auth_info_is_null = 1;
  let avatar_is_null = 1;
  const auth_info = {
    email: document.getElementById("input-email").value,
    phone: document.getElementById("input-phone").value,
    first_name: document.getElementById("input-first-name").value,
    last_name: document.getElementById("input-last-name").value,
  };
  const profile_info = {
    birthday: document.getElementById("input-birthday").value,
    address: document.getElementById("input-address").value,
    city: document.getElementById("input-city").value,
    region: document.getElementById("select-regions").value,
    postcode: document.getElementById("input-postcode").value,
  };

  const avatar = document.getElementById("input-user-avatar");
  //check if avatar exist
  if (!avatar.files[0]) {
    document.getElementById(
      "input-avatar-warning"
    ).innerHTML = `<div class="warning-text" id="warning-text">The avatar can not be null</div>`;
  } else {
    avatar_is_null = 0;
  }

  // check if any auth value is null
  for (key in auth_info) {
    if (!auth_info[key]) {
      document.getElementById(
        `input-${key}-warning`
      ).innerHTML = `<div class="warning-text" id="warning-text">The ${key} can not be null</div>`;
    } else {
      auth_info_is_null = 0;
    }
  }

  //check if any profile value is null, if it is, set it to be ""
  for (key in profile_info) {
    if (!profile_info[key] && key !== "region") {
      document.getElementById(`input-${key}`).value = "null";
    } else if (!profile_info[key] && key === "region") {
      document.getElementById("select-region").value = "null";
    }
  }

  // If none of auth values is null, we call send info function
  if (!auth_info_is_null && !avatar_is_null) {
    sendSaveInfo();
  }
}
