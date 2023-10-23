import { Router } from "express";
import { productManager } from "../ProductManager.js";

// Creación de rutas
const router = Router();
//const productManager = new ProductManager(`${__dirname}/db/products.json`);

router.get("/", async (req, res) => {
    const products = await productManager.getProducts({});
    res.render("home", {
        products: products,
        style: "index.css"
    });
});

router.get("/api/views/realtimeproducts", async (req, res) => {
    const products = await productManager.getProducts({});
    res.render("realtimeproducts", {
        products: products,
        style: "index.css"
    });
});

export default router;
 