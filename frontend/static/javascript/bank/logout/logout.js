const logout_url = "http://127.0.0.1:8000/auth/token/logout";
const logoutRequestOption = {
  method: "GET",
  headers: {
    Authorization: `token ${sessionStorage.getItem("token")}`,
  },
};
fetch(logout_url, logoutRequestOption)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Data received:", data);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
