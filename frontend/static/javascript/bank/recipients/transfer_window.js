const currencyRequestOption = {
  method: "GET",
  headers: {
    Authorization: `token ${sessionStorage.getItem("token")}`,
  },
};
//map currency codes with flags
const countryToFlag = {
  AUD: "🇦🇺",
  USD: "🇺🇸",
  GBP: "🇬🇧",
  CHF: "🇨🇭",
  JPY: "🇯🇵",
  CAD: "🇨🇦",
  EUR: "🇪🇺",
};
function openTransferWindow() {
  // pop transfer window
  document.getElementById(
    "transfer-area"
  ).innerHTML = `<div class="transfer-window" id="transfer-window">
        <div>Transfer to <b>${recipient["email"]}</b> 
        Username:<b>${recipient["username"]}</b> 
        Phone:<b>${recipient["phone"]}</b> 
        Fullname:<b>${recipient["fullname"]}</b>
        </div>
        <select
            name="transfer-currency"
            class="transfer-currency"
            id="transfer-currency"
        >
        </select>
        <input
            type="number"
            name="transfer-amount"
            id="transfer-amount"
            placeholder="Amount"
        />
        <button class="transfer-submit-btn" onclick="transferToCustomer()">Submit</button>
        </div>`;
  document.dispatchEvent(new CustomEvent("transferWindowInitiated"));
}

document.addEventListener("transferWindowInitiated", () => {
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
        document.getElementById("transfer-currency").innerHTML += `
    <option value=${currency["id"]}>${flag} ${currency["code"]}</option>`;
      }
    })
    .catch((e) => {
      console.log("There was a problem with the fetch operation: " + e.message);
    });
});
