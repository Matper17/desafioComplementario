import { existsSync, promises } from "fs";
import { __dirname } from "./utils.js";
//import { createHash } from "crypto";
//const fs = require("fs");
const path = "products.json"

class ProductManager {
  constructor (path){
   this.path = `${__dirname}/${path}`; 
  
  }
  
//Programación asíncrona
  async getProducts(queryObj) {
    console.log("QueryObj", queryObj)
    const {limit} = queryObj
    try {
      if(existsSync(this.path)){
        const productFile = await promises.readFile(this.path, "utf-8")
        const productData = JSON.parse (productFile)
        return limit ? productData.slice(0, limit) : productData; 
      } else{
        return[]
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts({})
      const product = products.find(p => p.id === id);
      if(!product){
        return "El producto ingresado es inexistente"
      } else{
        return product
      }
    } catch (error) {
      return error
    }
  }

  addProduct = async ({title,description,price,thumbnail,code,stock}) =>{
    const products = await this.getProducts({})
    try{
    if (!title || !description || !price || !thumbnail || !code || !stock){
      console.error ("Debes ingresar los datos del producto")
      return
    } else{
    const repeatCode = products.find (element => element.code === code)
    if (repeatCode){
      return console.error("El código ingresado ya existe")
    } else {
      let id
      if (!products.length) {
        id=1
      }else {
        id = products [products.length -1].id + 1
      }
      const newProduct = {
        title,description,price,thumbnail,code,stock
      }
      products.push({id, ...newProduct})
      await promises.writeFile(this.path, JSON.stringify(products))
    }
  }
} catch (error){
  console.log(error)
  return error
}
}

  updateProduct = async(id,{title,description,price,thumbnail,code,stock}) =>{
  if (!title || !description || !price || !thumbnail || !code || !stock){
    console.error ("Debes ingresar los datos del producto")
    return 
} else{
  const productList = await this.getProducts({})
  const newProductList = productList.map(element=>{
    if(element.id === id){
      const updateProduct={
        ...element, 
        title,description,price,thumbnail,code,stock
      }
      return updateProduct
    } else {
      return element
    }
  })
  await promises.writeFile (this.path, JSON.stringify(newProductList, null, 2))
}
}

  async deleteProduct(id){
    try {
      const products = await this.getProduct({})
      const newArrayProducts = products.filter(p => p.id !== id)
      await promises.writeFile (this.path, JSON.stringify (newArrayProducts))
    } catch (error) {
      return error
    }
  }
}

//Pruebas
// const product1 = {
//   name: "Name1", 
//   title: "product1",
//   description: "description1",
//   price: 1500,
//   thumbnail: "url",
//   code: "abc123",
//   stock: 230
// }

// const product2 = {
//   name: "Name2", 
//   title: "product2",
//   description: "description2",
//   price: 1000,
//   thumbnail: "url",
//   code: "abc223",
//   stock: 200
// } 

// async function test(){
//   const p1 = new ProductManager("products.json")

//   await p1.addProduct({title: "Auto1", description: "description1", price: 15000, thumbnail:"url", code: 123, stock: 5})
//   console.log(await p1.getProducts())
//   await p1.addProduct({title: "Auto2", description: "description2", price: 25000, thumbnail:"url", code: 223, stock: 3})
//   await p1.addProduct({title: "Auto3", description: "description3", price: 20000, thumbnail:"url", code: 203, stock: 2})
//   await p1.addProduct({title: "Auto4", description: "description4", price: 22000, thumbnail:"url", code: 113, stock: 7})
//   console.log(await p1.getProducts())

//   console.log(await p1.getProductById(1))
//   console.log(await p1.getProductsById(3))

//   await p1.updateProduct(1, {title: "Auto1", description: "description1", price: 15000, thumbnail:"url", code: 123, stock: 5})
//   await p1.updateProduct(1, {title: "Auto3", description: "description3", price: 20000, thumbnail:"url", code: 203, stock: 2})
//   console.log(await p1.getProducts())

//   await p1.deleteProduct(3)
//   await p1.deleteProduct(1)
//   console.log(await p1.getProducts())
// }


export const productManager = new ProductManager(path); 