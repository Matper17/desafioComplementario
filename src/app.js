import express from "express"
import {engine} from "express-handlebars"
import { __dirname } from "./utils.js";
import viewsRouter from "../routes/view.router.js"
import { Server } from "socket.io";
import {productMaganer} from "./ProductManager.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));


app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", __dirname + "/views");

app.use("/api/views", viewsRouter)

const httpServer = app.listen(8081, ()=>{
    console.log(`Escuchando al puerto 8081`)
})

const socketServer = new Server(httpServer)

//Conectar - Desconectar 

socketServer.on("connection", async (socket) =>{
    console.log("Cliente conectado")

    const products = await productMaganer.getProducts()
    socket.emit("products", products)
    
    socket.on("newProducts", async newProduct =>{
        const product = await productMaganer.addProduct(newProduct)
        console.log(product)
        if(!product){
            socket.emit("Message", "Error al añadir el producto")
        }

    })
})