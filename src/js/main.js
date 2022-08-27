import throttle from 'lodash/throttle'

let banks = []
try {
  banks = JSON.parse(localStorage.getItem("banks"))
} catch(exc){
  banks = []
  console.log(exc)
}

if(!banks){
  banks = []
}

const root = document.getElementById('root');
const banksContainer = document.createElement('div');
const loanInfoContainer = document.createElement('div');
const modalRef = document.getElementById('modal');

banksContainer.classList.add('banks-container');
loanInfoContainer.classList.add('loan-info-container');

root.append(banksContainer, loanInfoContainer);

const addButton = document.createElement('button');
const listOfBank = document.createElement('ul');

addButton.classList.add('create-bank-btn');
addButton.textContent = 'Додати';
const cleanButton = document.createElement('button');
cleanButton.classList.add('remove-all-banks-btn');
cleanButton.textContent = 'Очистити';
if (banks.length > 2) {
  banksContainer.append(listOfBank, addButton, cleanButton);
} else {
  banksContainer.append(listOfBank, addButton);
}

const bankNames = document.querySelectorAll('.bank-item-container');

listOfBank.addEventListener("click", onListOfBankClick );
addButton.addEventListener('click', onAddButtonClick);
cleanButton.addEventListener('click', onClearBankList);

function renderList(__banks = null) {
  let _banks = banks
  if(__banks){
    _banks = __banks
  }
  const itemOfBank = _banks
    .map((bank, index) => {
      return `<li class="bank-item bank-item-container" data-id = "${bank.id}"> 
              <span class="span-bank-id">${index + 1}</span>
              <span class="span-bank-name">${bank.name}</span>
              <button class="edit-bank-btn"><i class="fa-solid fa-pencil"></i></button>
              <button class="remove-bank-btn"><i class="fa-solid fa-xmark"></i></button>
          </li>`;
    })
    .join('');
  listOfBank.innerHTML = itemOfBank;

  if(banks.length <= 5 && document.querySelector(`input[name="search"]`)){
    document.querySelector(`input[name="search"]`).remove()
    return
  }
  if(banks.length > 5 && !document.querySelector(`input[name="search"]`)){
    const markup = `<input type="text" placeholder="search..." name="search" class="search-input">`
    banksContainer.insertAdjacentHTML("afterbegin",markup)
    const searchInput = document.querySelector(`input[name="search"]`)
    searchInput.addEventListener("keyup", throttle(filterBanks,100))
  }
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

function onClearActives() {
  const activeItems = document.querySelectorAll(
    '.bank-item-container.bank-item-active'
  );
  activeItems.forEach(e => e.classList.remove('bank-item-active'));
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

function onListOfBankClick(e) {

  if (e.target.nodeName === `UL`) {
    return;
  }
  const itemBank = e.target.closest('.bank-item');
  const itemId = itemBank.dataset.id;
  const currentBank = banks.find(bank => bank.id === itemId);

  if (e.target.closest(".edit-bank-btn")) {
    onEditClick(e);
  };

  if (e.target.closest(".remove-bank-btn")) {

    deleteBankItem(itemId);
    if (itemBank.classList.contains('bank-item-active')) {
      clearBankInfo();
    }

    renderList();
    if (banks.length < 3) {
      cleanButton.remove();
    }

    return;
  }
  
  renderInfoMarkUp(currentBank);

  onClearActives();
  itemBank.classList.add("bank-item-active");
}


function onEditClick(ev) {
  const currentBank = banks.find(
    el => el.id === ev.target.parentNode.dataset.id
  );
  onAddButtonClick(currentBank);
}

function deleteBankItem(id) {
  banks = banks.filter(elem => elem.id !== id);
}

function clearBankInfo() {
  loanInfoContainer.innerHTML = '';
}

function onAddButtonClick(currentBank = null) {
  modalRef.innerHTML = renderModalMarkup();
  const form = document.querySelector(".form-backdrop")
  if(currentBank && currentBank.id && currentBank.name){
    document.querySelector(".form-title").textContent = `Edit bank ${currentBank.name}`
    form.setAttribute("data-id", currentBank.id)
  
    Object.keys(currentBank).forEach(key => {
      if(key === "id"){
        return
      }
      form.elements[key].value = currentBank[key]
    })
  }
  const closeModalBtn = modalRef.querySelector('.close');
  closeModalBtn.addEventListener('click', onCloseModal);
  const formBackdrop = document.querySelector('.form-backdrop');
  formBackdrop.addEventListener('submit', onFormSubmit);
}

function onCloseModal() {
  modalRef.innerHTML = '';
}

function onFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const bank = {};

  
  formData.forEach((value, key) => {
    bank[key] = value;
  });

  
  if(e.target.getAttribute("data-id")){
    bank.id = e.target.getAttribute("data-id");
    let index = banks.findIndex(el => el.id === bank.id )
    if(index >= 0){
      banks[index] = bank
    }
  } else {
    bank.id = crypto.randomUUID();
    banks.push(bank);
  }
  
  localStorage.setItem("banks", JSON.stringify(banks))
  if (banks.length > 2) {
    banksContainer.append(cleanButton);
  }
  renderList();
  onCloseModal();
}

function onClearBankList() {
  listOfBank.innerHTML = '';
  loanInfoContainer.innerHTML = '<p>Немає інформації про банки</p>';
  banks = [];
  cleanButton.remove();
  console.log('onClearBankList');
}

function filterBanks(ev){
  const filterStr = ev.target.value.trim()
  if(!filterStr){
    renderList()
    clearBankInfo()
  }
  const filteredBanks = banks.filter((el) => 
    el.name.toUpperCase()
    .indexOf(filterStr.toUpperCase()) >= 0)
  renderList(filteredBanks)
  clearBankInfo()
}
