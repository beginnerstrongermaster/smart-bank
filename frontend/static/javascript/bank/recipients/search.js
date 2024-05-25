let recipient;
function searchRecipient() {
  const customers_url = "http://127.0.0.1:8000/bank/customers/";
  fetch(customers_url, {
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
      //get input value
      input_value = document.getElementById("input-email-phone").value;
      //extract all customers' emails and phones
      customer_emails = data.map((customer) => {
        return customer["email"];
      });
      customer_phones = data.map((customer) => {
        return customer["phone"];
      });
      // If input value matches customer's email or phone, display that customer in the result
      if (
        customer_emails.includes(input_value) ||
        customer_phones.includes(input_value)
      ) {
        // If input includes "@", that means the user inputted an email, we use email to locate customer
        if (input_value.includes("@")) {
          for (customer of data) {
            if (customer["email"] === input_value) {
              //get the recipient we are searching for
              recipient = customer;
              break;
            }
          }
        } else {
          for (customer of data) {
            if (customer["phone"] === input_value) {
              //get the recipient we are searching for
              recipient = customer;
              break;
            }
          }
        }
        const recipient_avatar =
          "http://127.0.0.1/media/" + recipient["avatar"];
        const recipient_avatar_alt = recipient["username"]
          .substr(0, 2)
          .toUpperCase();
        document.getElementById(
          "search-result"
        ).innerHTML = `<div class="result-username" id="result-username"><img class="recipient-avatar" id="recipient-avatar" src=${recipient_avatar} alt=${recipient_avatar_alt}>${recipient["username"]}</div>
          <div class="result-fullname" id="result-fullname">${recipient["fullname"]}</div>
          <div class="result-email" id="result-email">${recipient["email"]}</div>
          <div class="result-phone" id="result-phone">${recipient["phone"]}</div>
        <button class="result-transfer-btn" onclick="openTransferWindow()">Transfer</button>`;
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
