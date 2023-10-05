const socketClient = io()

const form = document.getElementById("form")
const inputPrice = document.getElementById("precio")
const precio1 = document.getElementById("precio1")

form.onsubmit = (e) =>{
    e.preventDefault(); 
    const price = inputPrice.value
}
