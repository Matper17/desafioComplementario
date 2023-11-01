const { default: Swal } = require("sweetalert2")

const socketClient = io()
const h4Name = document.getElementById("name")
const form = document.getElementById("chatForm")
const inputMessage = document.getElementById("message")
const divChat = document.getElementById("chat")

let user; 
Swal.fire({
    title: "Bienvenido/a", 
    text:"¿Cuál es tu nombre?",
    input: "text", 
    inputValidator: (value) =>{
        if(!value){
            return "Indicanos tu nombre"
        }
    }, 
    confirmButtonText: "Enter",
}).then((input) =>{
    user = input.value
    h4Name.innerText = user
    socketClient.emit("newUser", user)
})

socketClient.on ("userConnected", (user) =>{
    Toastify({
        text: `${user} connected`,
        style:{
            background: "linear-gradient(to right, #00b09b, #96c93d)"
        },
        duration: 4500,
    }).showToast(); 
})

form.onsubmit = (e) =>{
    e.preventDefault()
    const infoMessage ={
        name: user, 
        message: inputMessage.value,
    }
    inputMessage.innerText = ""
    socketClient.emit("message", infoMessage)
}

socketClient.on("chat", (messages) =>{
    const chat = messages
        .map((m) =>{
            return `<p>${m.name}: ${m.message}</p>`
        })
        .join(" ")
        divChat.innerHTML = chat;
})