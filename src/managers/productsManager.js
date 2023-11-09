import {productsModel} from "../db/models/products.model.js"

class ProductManager{
    async findAll(obj){
        const {limit = 20, page = 1, ...filter} = obj;
        const response = await productsModel.paginate(filter, {limit, page})

        const info = {
            status: response.status, 
            payload: response.docs,
            totalPages: response.totalPages,
            prev: response.hasPrevPage, 
            prevLink: response.hasPrevPage ? `http://localhost:8080/api/products?page=${response.prevPage}` : null,
            next: response.hasNextPage,
            nextLink: response.hasNextPage ? `http://localhost:8080/api/products?page=${response.nextPage}` : null,
        }
        const results = response.docs;
        return{info, results};
    }

    async findById(id){
        const result = await productsModel.findById(id)
        return result
    }

    async createOne(obj){
        const result = await productsModel.create(obj)
        return result
    }

    async updateOne (id, obj){
        const result = await productsModel.updateOne({_id: id}, obj)
        return result
    }

    async deleteOne(id){
        const result = await productsModel.deleteOne({_id: id})
        return result 
    }
}

export const productsManager = new ProductManager(); 