const wallets_url = "http://127.0.0.1:8000/bank/wallets/";
fetch(wallets_url, {
  headers: {
    Authorization: `token ${sessionStorage.getItem("token")}`,
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Data received:", data);
    // we check wallet's currency and give it an approperate currency icon
    for (const wallet of data) {
      currency = wallet["currency"];
      amount = wallet["amount"];
      currency_icon_name = currency.toLowerCase();
      document.getElementById("wallets").innerHTML += `<div class="wallet">
          <img
            class="wallet-currency"
            src="../../static/images/bank/currency/${currency_icon_name}.png"
            alt=${currency}
          />
          <div class="wallet-amount">${wallet["amount"]}</div>
        </div>`;
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
