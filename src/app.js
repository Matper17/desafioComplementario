import express from "express"
import handlebars from "express-handlebars"
import { __dirname } from "./utils.js";
import productsRouter from "./routes/products.router.js"
import usersRouter from "./routes/users.router.js"
import viewsRouter from "./routes/view.routes.js"
import cartsRouter from "./routes/carts.router.js"
import clientsRouter from "./routes/clients.router.js"
//Data bases
import "./db/configDB.js"


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
//app.use(express.static(path.join(__dirname + '/public')));

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set("views", __dirname, "views");
app.set('view engine', 'handlebars');

//Routes
app.use("/api/products", productsRouter)
app.use("/api/users", usersRouter)
app.use("/", viewsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/clients", clientsRouter)

const httpServer = app.listen(8080, ()=>{
    console.log(`Escuchando al puerto 8080`)
})

//const socketServer = new Server(httpServer)

//Conectar - Desconectar 

// socketServer.on("connection", async (socket) =>{
//     console.log("Cliente conectado")

//     const products = await productManager.getProducts({})
//     socket.emit("products", products)
    
//     socket.on("newProduct", async newProduct =>{
//         const product = await productManager.addProduct(newProduct)
//         console.log(product)
//         if(!product){
//             socket.emit("Message", "Error al añadir el producto")
//         }

//     })
// })