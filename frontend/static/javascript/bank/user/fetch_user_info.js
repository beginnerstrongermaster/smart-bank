let user_region;
const requestOption = {
  method: "GET",
  headers: {
    Authorization: `token ${sessionStorage.getItem("token")}`,
  },
};

//fetch profile data
fetch(customer_url, requestOption)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Profile Data Received:", data);
    user_region = data["region"];
    document.dispatchEvent(new CustomEvent("userRegionFetched"));
    document.getElementById("input-city").value = data["city"];
    document.getElementById("input-address").value = data["address"];
    document.getElementById("input-birthday").value = data["birthday"];
    document.getElementById("input-postcode").value = data["postcode"];
    document.getElementById("input-first-name").value = data["first_name"];
    document.getElementById("input-last-name").value = data["last_name"];
    document.getElementById("input-phone").value = data["phone"];
    document.getElementById("input-email").value = data["email"];
  })
  .catch((e) => {
    console.error("There was a problem with the fetch operation:", e);
  });
