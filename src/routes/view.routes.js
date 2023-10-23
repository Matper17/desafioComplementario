import { Router } from "express";
//import { productManager } from "../ProductManager.js";

// Creación de rutas
const router = Router();
//const productManager = new ProductManager(`${__dirname}/db/products.json`);

// router.get("/", async (req, res) => {
//     const products = await productManager.getProducts({});
//     res.render("home", {
//         products: products,
//         style: "index.css"
//     });
// });

//Ruteo de prueba - ERROR 404
router.get("/", async (req, res) => {
    //const products = await productManager.getProducts({});
    res.render("realtimeproducts");
});

export default router;
 