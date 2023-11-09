import express from "express"
import { Server } from "socket.io";
import {engine} from "express-handlebars"
import { __dirname } from "./utils.js";
import productsRouter from "./routes/products.router.js"
import usersRouter from "./routes/users.router.js"
import viewsRouter from "./routes/view.routes.js"
import cartsRouter from "./routes/carts.router.js"
import clientsRouter from "./routes/clients.router.js"
import bodyParser from "body-parser";
import path from "path";
//Data bases
import "./db/configDB.js"


const app = express()
//const path = require("path")


app.use(express.json())
app.use(express.urlencoded({extended: true}))
//app.use(express.static(path.join(__dirname + '/public')));

//Handlebars
app.engine('handlebars', engine());
app.set("views", path.join(__dirname, "/views"));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use("/api/products", productsRouter)
app.use("/api/users", usersRouter)
app.use("/", viewsRouter)
app.use("/api/carts", cartsRouter)
app.use("/api/clients", clientsRouter)

const httpServer = app.listen(8080, ()=>{
    console.log(`Escuchando al puerto 8080`)
})

//Conectar - Desconectar (Clientes)
const socketServer = new Server(httpServer)

const messages = []
socketServer.on("connection", (socket) =>{
    console.log(`El cliente está conectado: ${socket.id}`)
    socket.on("newUser", (user) =>{
        socket.broadcast.emit("userConnected", user)
        socket.emit("connected")
    })
    socket.on("message", (infoMessage)=>{
        messages.push(infoMessage)
        socketServer.emit("chat", messages)
    })
})