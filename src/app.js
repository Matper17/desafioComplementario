import express from "express"
import {engine} from "express-handlebars"
import { __dirname } from "./utils.js";
import viewsRouter from "./routes/view.routes.js"
import { Server } from "socket.io";
import {productManager} from "./ProductManager.js"
import path from "path"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname + '/public')));


app.engine('handlebars', engine());
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'handlebars');


app.use("/api/views", viewsRouter)

const httpServer = app.listen(8080, ()=>{
    console.log(`Escuchando al puerto 8080`)
})

const socketServer = new Server(httpServer)

//Conectar - Desconectar 

socketServer.on("connection", async (socket) =>{
    console.log("Cliente conectado")

    const products = await productManager.getProducts()
    socket.emit("products", products)
    
    socket.on("newProducts", async newProduct =>{
        const product = await productManager.addProduct(newProduct)
        console.log(product)
        if(!product){
            socket.emit("Message", "Error al añadir el producto")
        }

    })
})