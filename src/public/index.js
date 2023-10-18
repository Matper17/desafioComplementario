const socket = io();

const form = document.getElementById("productsForm");
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputPrice = document.getElementById("price");
const inputCode = document.getElementById("code");
const inputStock = document.getElementById("stock");
const inputCategory = document.getElementById("category");
const inputThumbnails = document.getElementById("thumbnails");
const pMessage = document.getElementById('message')

socket.on('products', products => {
  console.log(products)
  showProducts(products)
});

socket.on('messages', message => {
  console.log(message)
  pMessage.innerText=message
})

form.onsubmit = (e) => {
  e.preventDefault();
  const infoProduct = {
    title: inputTitle.value,
    description: inputDescription.value,
    price: inputPrice.value,
    code: inputCode.value,
    stock: inputStock.value,
    thumbnails: inputThumbnails.value,
    category: inputCategory.value,
  };
  console.log("hello!")
  inputTitle.value = "";
  inputDescription.value = "";
  inputPrice.value = "";
  inputCode.value = "";
  inputStock.value = "";
  inputCategory.value = "";
  inputThumbnails.value = "";
  socket.emit("newProduct", infoProduct);
};

const showProducts = (products = []) => {
  const html = products.map(({ title, description, price, }, index) => {
    return (`<div>
    <strong style="color: blue">${title}</strong>
    [<span style="color: brown">${description}</span>] : 
    <em style="color: green">${price}</em></div>`)
  }).join(" ");
  document.getElementById('productos').innerHTML = html;
}

