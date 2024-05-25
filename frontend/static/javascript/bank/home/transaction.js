const transactions_url = "http://127.0.0.1:8000/bank/transactions/";
fetch(transactions_url, {
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

    //get the first transanction in the dictionary
    const transaction = data[0];

    // if transaction exists
    if (transaction) {
      //get sender of the first transaction
      const transaction_sender = transaction["sender"];
      const sender_username = transaction_sender["username"];
      const sender_avatar_alt = sender_username.substr(0, 2).toUpperCase();
      const sender_avatar =
        "http://127.0.0.1:8000/media/" + transaction_sender["avatar"];

      //get receiver of the first transaction
      const transaction_receiver = transaction["receiver"];
      const receiver_username = transaction_receiver["username"];
      const receiver_avatar_alt = receiver_username.substr(0, 2).toUpperCase();
      const receiver_avatar =
        "http://127.0.0.1:8000/media/" + transaction_receiver["avatar"];

      //get amount fo the first transaction
      const transaction_amount = transaction["amount"];

      //get currency of the first transaction
      const transaction_currency = transaction["currency"];

      //get currency's icon name
      const transaction_currency_icon_name = transaction_currency.toLowerCase();

      //set transactions to the first transaction we got
      document.getElementById(
        "sender"
      ).innerHTML = `<img class="sender-avatar" src=${sender_avatar} alt=${sender_avatar_alt}><div class="sender-username">${sender_username}</div>`;
      document.getElementById(
        "receiver"
      ).innerHTML = `<div class="receiver-username">${receiver_username}</div><img class="receiver-avatar" src=${receiver_avatar} alt=${receiver_avatar_alt}> `;
      document.getElementById("amount").innerHTML = transaction_amount;
      document.getElementById(
        "currency"
      ).innerHTML = `<img src="../../static/images/bank/currency/${transaction_currency_icon_name}.png" alt=${transaction_currency}>`;
    }
    //if transaction doesn't exist, set a notification
    else {
      document.getElementById("sender").innerHTML =
        "You don't have any transanction yet";
      document.getElementById("receiver").innerHTML = "";
      document.getElementById("amount").innerHTML = "";
      document.getElementById("currency").innerHTML = "";
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
