function toggleModal(){
    const modalElem = document.querySelector("[data-modal]")
    modalElem.classList.toggle("is-hidden")
}

const closeModalElem = document.querySelector("[data-modal-close]")

closeModalElem.addEventListener("click", toggleModal)

