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

const root = document.getElementById("root");
const banksContainer = document.createElement("div");
const loanInfoContainer = document.createElement("div");

banksContainer.classList.add("banks-container");
loanInfoContainer.classList.add("loan-info-container");

root.append(banksContainer, loanInfoContainer);

const addButton = document.createElement('button');
const cleanButton = document.createElement('button');
const listOfBank = document.createElement("ul");

addButton.classList.add('create-bank-btn');
addButton.textContent = 'Додати';
cleanButton.classList.add('remove-all-banks-btn');
cleanButton.textContent = 'Очистити';
banksContainer.append(listOfBank, addButton, cleanButton);

function renderList() { 
   const itemOfBank = banks.map((bank, index) => {
   return `<li class="bank-item" data-id = "${bank.id}">
            <div class="bank-item-container">
              <span class="span-bank-id">${index + 1}</span>
              <span class="span-bank-name">${bank.name}</span>
              <button class="edit-bank-btn"><i class="fa-solid fa-pencil"></i></button>
              <button class="remove-bank-btn"><i class="fa-solid fa-xmark"></i></button>
            </div>
          </li>`
  }).join('');
  listOfBank.innerHTML = itemOfBank;
};
renderList();

const bankNames = document.querySelectorAll('.span-bank-name');
console.dir(bankNames)

const onClickBankName = (ev) => {
    console.log(ev.target.textContent)
    const currentBank = banks.find(bank => bank.name === ev.target.textContent)
    console.log(currentBank)
  }

bankNames.forEach((elem) => {
  elem.addEventListener('click', onClickBankName)
})

// function toggleModal() {
//   const modalElem = document.querySelector("[data-modal]");
//   modalElem.classList.toggle("is-hidden");
// }

// const closeModalElem = document.querySelector("[data-modal-close]");
// const createBankBtn = document.querySelector(".create-bank-btn");

// closeModalElem.addEventListener("click", toggleModal);
// createBankBtn.addEventListener("click", toggleModal);


