const currencyRequestOption = {
  method: "GET",
  headers: {
    Authorization: `token ${sessionStorage.getItem("token")}`,
  },
};

//map currency codes with flags
const countryToFlag = {
  AUD: "\u{1F1E6}\u{1F1FA}",
  USD: "\u{1F1FA}\u{1F1F8}",
  GBP: "\u{1F1EC}\u{1F1E7}",
  CHF: "\u{1F1E8}\u{1F1ED}",
  JPY: "\u{1F1EF}\u{1F1F5}",
  CAD: "\u{1F1E8}\u{1F1E6}",
  EUR: "\u{1F1EA}\u{1F1FA}",
};
// get all currencies set them as options
fetch("http://127.0.0.1:8000/bank/currencies/", currencyRequestOption)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("Currency Data:", data);
    for (currency of data) {
      flag = countryToFlag[currency["code"]] || "";
      let container = document.getElementById("currency-selector");
      container.innerHTML += `
      <option value=${currency["id"]}>${flag} ${currency["code"]}</option>`;
    }
  })
  .catch((e) => {
    console.log("There was a problem with the fetch operation: " + e.message);
  });
function createWallet() {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `token ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currency: document.getElementById("currency-selector").value,
      amount: document.getElementById("amount-input").value,
    }),
  };

  fetch("http://127.0.0.1:8000/bank/wallets/", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((json) => {
      console.log(json);
      location.reload();
    })
    .catch((e) => {
      console.log("There was a problem with the fetch operation: " + e.message);
    });
}
