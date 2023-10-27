import { Router } from "express";
import {productsManager} from "../managers/productsManager.js"

const router = Router(); 

router.get("/", async (req, res)=>{
    try {
        const products = await productsManager.findAll()
        res.status(200).json({message: "Products", products})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

router.post("/", async (req, res) =>{
    try {
        const createdProduct = await productsManager.createOne(req.body)
        res
        .status(200)
        .json({message: "Product created", product: createdProduct})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

router.delete("/idProduct", async(req, res)=>{
    const {idProduct} = req.params
    try {
        await productsManager.deleteOne(idProduct)
        res.status(200).json({message: "Product deleted"})
    } catch (err) {
        res.status(500).json({error: err.message})
    }
})

export default router; 