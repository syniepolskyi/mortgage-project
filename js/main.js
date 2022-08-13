let banks = [
  // {
  //   id: "435tr34wrt",
  //   name: "Mono",
  //   interestRate: 5,
  //   maxLoan: 500000,
  //   minPayment: 1000,
  //   loanTerm: 12,
  // },
  // {
  //   id: "asdfw342rew5",
  //   name: "Privat",
  //   interestRate: 7,
  //   maxLoan: 1000000,
  //   minPayment: 5000,
  //   loanTerm: 50,
  // },
];

const root = document.getElementById("root");
const banksContainer = document.createElement("div");
const loanInfoContainer = document.createElement("div");
const modalRef = document.getElementById("modal");

banksContainer.classList.add("banks-container");
loanInfoContainer.classList.add("loan-info-container");

root.append(banksContainer, loanInfoContainer);

const addButton = document.createElement("button");
const listOfBank = document.createElement("ul");

addButton.classList.add("create-bank-btn");
addButton.textContent = "Додати";
const cleanButton = document.createElement("button");
cleanButton.classList.add("remove-all-banks-btn");
cleanButton.textContent = "Очистити";
if (banks.length > 2) {
  banksContainer.append(listOfBank, addButton, cleanButton);
} else {
  banksContainer.append(listOfBank, addButton);
}

function renderList() {
  const itemOfBank = banks
    .map((bank, index) => {
      return `<li class="bank-item bank-item-container" data-id = "${bank.id}"> 
              <span class="span-bank-id">${index + 1}</span>
              <span class="span-bank-name">${bank.name}</span>
              <button class="edit-bank-btn"><i class="fa-solid fa-pencil"></i></button>
              <button class="remove-bank-btn"><i class="fa-solid fa-xmark"></i></button>
          </li>`;
    })
    .join("");
  listOfBank.innerHTML = itemOfBank;

  document
    .querySelectorAll(`.edit-bank-btn`)
    .forEach((e) => e.addEventListener(`click`, onEditClick));
}

renderList();

function renderModalMarkup() {
  return `
  <div class="backdrop" data-modal>
  <form class="form-backdrop">
    <button type="button" class="close" data-modal-close>
      <i class="fa-solid fa-xmark"></i>
    </button>
    <h3 class="form-title">New bank</h3>
    <div class="form-container">
      <div class="form-group">
        <label for="name">name</label>
        <input type="text" name = "name" id="name">
      </div>
      <div class="form-group">
        <label for="maxLoan">Mortgage size, $: </label>
        <input type="text" name = "maxLoan" id="maxLoan">
      </div>
      <div class="form-group">
        <label for="minPayment">Minimum down payment, $: </label>
        <input type="text" name="minPayment" id="minPayment">
      </div>
      <div class="form-group">
        <label for="loanTerm">Loan period, month: </label>
        <input type="text" name="loanTerm" id="loanTerm">
      </div>
      <div class="form-group">
        <label for="interestRate">Invest rate, %: </label>
        <input type="text" name ="interestRate" id="interestRate">
      </div>
      <div class="form-group submit-container">
        <button type="submit" class="submit-btn">Зберегти</button>
      </div>
    </div>
  </form>
</div>
`;
}

const bankNames = document.querySelectorAll(".bank-item-container");

function onClearActives() {
  const activeItems = document.querySelectorAll(
    ".bank-item-container.bank-item-active"
  );
  activeItems.forEach((e) => e.classList.remove("bank-item-active"));
}

function renderInfoMarkUp(bank) {
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
`;
  loanInfoContainer.innerHTML = bankInfoItem;
}

listOfBank.addEventListener("click", (e) => {
  if (e.target.nodeName === `UL`) {
    return;
  }
  const itemBank = e.target.closest(".bank-item");
  const itemId = itemBank.dataset.id;
  const currentBank = banks.find((bank) => bank.id === itemId);

  if (e.target.closest(".remove-bank-btn")) {
    deleteBankItem(itemId);
    clearBankInfo();
    renderList();
    if (banks.length < 3) {
      cleanButton.remove();
    }
    return;
  }

  renderInfoMarkUp(currentBank);
  onClearActives();
  itemBank.classList.add("bank-item-active");
});

function onEditClick(ev) {
  const currentBank = banks.find(
    (el) => el.id === ev.target.parentNode.dataset.id
  );
  console.log(currentBank);
}

function deleteBankItem(id) {
  console.log(`del`);
  banks = banks.filter((elem) => elem.id !== id);
}

function clearBankInfo() {
  loanInfoContainer.innerHTML = "";
}

addButton.addEventListener("click", onAddButtonClick);
cleanButton.addEventListener("click", onClearBankList);

function onAddButtonClick() {
  modalRef.innerHTML = renderModalMarkup();
  const closeModalBtn = modalRef.querySelector(".close");
  closeModalBtn.addEventListener("click", onCloseModal);
  const formBackdrop = document.querySelector(".form-backdrop");
  formBackdrop.addEventListener("submit", onFormSubmit);
}

function onCloseModal() {
  modalRef.innerHTML = "";
}

function onFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const bank = {};

  formData.forEach((value, key) => {
    bank[key] = value;
  });

  bank.id = crypto.randomUUID();

  banks.push(bank);
  if (banks.length > 2) {
    banksContainer.append(cleanButton);
  }
  renderList();
  onCloseModal();
}

function onClearBankList() {
  listOfBank.innerHTML = "";
  loanInfoContainer.innerHTML = "<p>Немає інформації про банки</p>";
  banks = [];
  cleanButton.remove();
}

// function toggleModal() {
//   const modalElem = document.querySelector("[data-modal]");
//   modalElem.classList.toggle("is-hidden");
// }

// const closeModalElem = document.querySelector("[data-modal-close]");
// const createBankBtn = document.querySelector(".create-bank-btn");

// closeModalElem.addEventListener("click", toggleModal);
// createBankBtn.addEventListener("click", toggleModal);
