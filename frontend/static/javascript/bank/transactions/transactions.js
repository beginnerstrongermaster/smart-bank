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
    //check if transactions are None or not
    if (data.length) {
      // If not None, we set transaction
      for (transaction of data) {
        // get current transaction's data
        const currency = transaction["currency"];
        const currency_icon_name = currency.toLowerCase();

        const amount = transaction["amount"];

        const sender = transaction["sender"];
        const sender_username = sender["username"];
        const sender_avatar_alt = sender_username.substr(0, 2).toUpperCase();
        const sender_avatar = "http://127.0.0.1:8000/media/" + sender["avatar"];

        const receiver = transaction["receiver"];
        const receiver_username = receiver["username"];
        const receiver_avatar_alt = receiver_username
          .substr(0, 2)
          .toUpperCase();
        const receiver_avatar =
          "http://127.0.0.1:8000/media/" + receiver["avatar"];

        document.getElementById(
          "transactions"
        ).innerHTML += ` <div class="transactions-records">
        <div class="sender"><img class="sender-avatar" src=${sender_avatar} alt=${sender_avatar_alt}><div class="sender-username">${sender_username}</div></div>
        <div class="currency">
          <img src="../../static/images/bank/currency/${currency_icon_name}.png" alt=${currency} />
        </div>
        <div class="amount">${amount}</div>
        <div class="receiver"><div class="receiver-username">${receiver_username}</div><img class="receiver-avatar" src=${receiver_avatar} alt=${receiver_avatar_alt}></div>
      </div>`;
      }
    } else {
      //If transactions are None, we set a notification
      document.getElementById(
        "transactions"
      ).innerHTML += ` <div class="transactions-records">
      <div class="sender">You don't have any transaction yet</div>
      <div class="currency">
      </div>
      <div class="amount"></div>
      <div class="receiver"></div>
    </div>`;
    }
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
