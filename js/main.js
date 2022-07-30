const root = document.getElementById("root");
const banksContainer = document.createElement("div");
const loanInfoContainer = document.createElement("div");

banksContainer.classList.add("banks-container");
loanInfoContainer.classList.add("loan-info-container");

root.append(banksContainer, loanInfoContainer);

// function toggleModal() {
//   const modalElem = document.querySelector("[data-modal]");
//   modalElem.classList.toggle("is-hidden");
// }

// const closeModalElem = document.querySelector("[data-modal-close]");
// const createBankBtn = document.querySelector(".create-bank-btn");

// closeModalElem.addEventListener("click", toggleModal);
// createBankBtn.addEventListener("click", toggleModal);

const banks = [
  {
    id: "435tr34wrt",
    name: "Mono",
    interestRate: 5,
    maxLoan: 500000,
    minPayment: 1000,
    loanTerm: 12,
  },
  {
    id: "asdfw342rew5",
    name: "Privat",
    interestRate: 7,
    maxLoan: 1000000,
    minPayment: 5000,
    loanTerm: 50,
  },
];
