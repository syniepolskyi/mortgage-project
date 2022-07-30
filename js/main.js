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
   return `<li class="bank-item bank-item-container" data-id = "${bank.id}"> 
              <span class="span-bank-id">${index + 1}</span>
              <span class="span-bank-name">${bank.name}</span>
              <button class="edit-bank-btn"><i class="fa-solid fa-pencil"></i></button>
              <button class="remove-bank-btn"><i class="fa-solid fa-xmark"></i></button>
          </li>`
  }).join('');
  listOfBank.innerHTML = itemOfBank;

document.querySelectorAll(`.edit-bank-btn`).forEach(e=>e.addEventListener(`click`, onEditClick));
document.querySelectorAll(`.remove-bank-btn`).forEach(e=>e.addEventListener(`click`, onDelClick));


};

renderList();

const bankNames = document.querySelectorAll('.bank-item-container');

const onClickBankName = (ev) => {
    // console.log(ev.target.textContent)
    if (ev.target.nodeName === `BUTTON`){
        return;
    }
    const currentBank = banks.find(bank => bank.id === ev.currentTarget.dataset.id )
    renderInfoMarkUp(currentBank);
  }

function renderInfoMarkUp (bank){
 const bankInfoItem = ` 
    <ul >
    <li class="loan-info-item">
      <div class="loan-info-key">Bank</div>
      <div class="loan-info-value">${bank.name}</div>
    </li>
    <li class="loan-info-item">
      <div class="loan-info-key">Mortgage size, $</div>
      <div class="loan-info-value">${bank.maxLoan}</div>
    </li>
    <li class="loan-info-item">
      <div class="loan-info-key">Minimum down payment, $</div>
      <div class="loan-info-value">${bank.minPayment}</div>
    </li>
    <li class="loan-info-item">
      <div class="loan-info-key">Loan period, month</div>
      <div class="loan-info-value">${bank.loanTerm}</div>
    </li>
        <li class="loan-info-item">
      <div class="loan-info-key">Invest rate, %</div>
      <div class="loan-info-value">${bank.interestRate}</div>
        </li>
    </ul>
`
loanInfoContainer.innerHTML = bankInfoItem;


}


bankNames.forEach((elem) => {
  elem.addEventListener('click', onClickBankName)
})

function onEditClick(ev){
    
    const currentBank = banks.find(el=>el.id===ev.target.parentNode.dataset.id)
    console.log(currentBank);
}

function onDelClick(){
    console.log(`del`);
}
// function toggleModal() {
//   const modalElem = document.querySelector("[data-modal]");
//   modalElem.classList.toggle("is-hidden");
// }

// const closeModalElem = document.querySelector("[data-modal-close]");
// const createBankBtn = document.querySelector(".create-bank-btn");

// closeModalElem.addEventListener("click", toggleModal);
// createBankBtn.addEventListener("click", toggleModal);


