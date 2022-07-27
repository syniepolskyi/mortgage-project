function toggleModal(){
    const modalElem = document.querySelector("[data-modal]")
    modalElem.classList.toggle("is-hidden")
}

const closeModalElem = document.querySelector("[data-modal-close]")
const createBankBtn = document.querySelector(".create-bank-btn")

closeModalElem.addEventListener("click", toggleModal)
createBankBtn.addEventListener("click", toggleModal)
