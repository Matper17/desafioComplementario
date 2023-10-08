const socketClient = io()
const div = document.getElementById("elements")
const form = document.getElementById("form")
const tittle = document.getElementById("tittle")
const description = document.getElementById("description")
const price = document.getElementById("price")
const search = document.getElementById("search")



div.onsubmit = (e) =>{
    e.preventDefault(); 
    const infoProducts = {
        tittle: tittle, 
        description: description, 
        price: price, 
        search: search, 
        message: inputProducts.value,
    }; 
    inputProducts.innerText= " ";
    socketClient.emit("message", infoProducts);
}; 

socketClient.on("chat", (message) =>{
    const chat = message
    .map((m) =>{
        return `<p> ${m.tittle}: ${m.message} </p>`
    })
    .join(" ")
    div.innerHTML = chat
})

