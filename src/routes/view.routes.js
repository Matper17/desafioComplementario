import { Router } from "express";
import {productManager} from "../ProductManager.js"

const router = Router()
const productManager = new productManager (`${__dirname}/db/products.json`)

router.get("/", async (req, res) =>{
    const products = await productManager.getProducts()

    res.render("Home", {
        products: products, 
        style: "index.css"
    })

})


router.get("/realtimeproducts", async (req, res)=>{
    const products = await productManager.getProducts()

    res.render("realTimeProducts", {
        products: products, 
        style: "index.css"
    })
})

export default router; 