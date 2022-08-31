import { product , ProductModel } from "../../Models/product";
import express  from "express";
import jwt from "jsonwebtoken";


const productsContext = new ProductModel();
const create =async (_req:express.Request, res:express.Response) => {
    try {
        const newproduct : product = {
            productname :_req.body.productname , 
            price : _req.body.price ,
            category : _req.body.category
        }
        const token = await jwt.verify(_req.headers.authorization as string ,process.env.TOKENSECRET as string )
        const result = await productsContext.create(newproduct);
        res.send(result); 
    } catch (error) {
        res.send("Token failed with product creation ");
    }
}

const show = async (_req:express.Request, res:express.Response) => {
    try {
        const id  = parseInt(_req.params.id);
        const result = await productsContext.show(id);
        if (result) {
            res.send(result); 
        }else {
            res.send("this product id is not defined "); 
        }
    } catch (error) {
        res.send("error with product fetch  ");
    }

}

const index = async (_req:express.Request, res:express.Response) => {
    try {
    const result = await productsContext.index();
    res.send(result);
    } catch (error) {
        res.send("error with product fetch  ");
    }
}    

export const Producthandler = (app:express.Application) => {
    app.get("/products" , index);
    app.post("/product", create);
    app.get("/product/:id" , show);
}
