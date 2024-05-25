function transferToCustomer() {
  const requestOption = {
    method: "POST",
    headers: {
      Authorization: `token ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    // send request's body
    body: JSON.stringify({
      receiver: recipient["id"],
      currency: document.getElementById("transfer-currency").value,
      amount: document.getElementById("transfer-amount").value,
    }),
  };
  fetch("http://127.0.0.1:8000/bank/transactions/", requestOption)
    .then((response) => {
      if (!response.ok) {
        response.json().then((resultArray) => {
          document.getElementById(
            "transfer-window"
          ).innerHTML = `<div>${resultArray[0]}</div>`;
        });
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((json) => {
      console.log("Data received:", json);
      location.reload();
    })
    .catch((e) => {
      console.log("There was a problem with the fetch operation: " + e.message);
    });
}
