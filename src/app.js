import express from "express"
import {engine} from "express-handlebars"
import { __dirname } from "./utils.js";
import viewsRouter from "../routes/view.router.js"
import { Server } from "socket.io";

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

socketServer.on("connection", (socket) =>{
    socket.on("disconnect", ()=>{
        console.log(`Cliente conectado: ${socket.id}`)
    }) 
    
    socket.on("newPrice", (value)=>{
        socket.broadcast.emit("priceUploated", value)
    })
})