"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Producthandler = void 0;
const product_1 = require("../../Models/product");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const productsContext = new product_1.ProductModel();
const create = async (_req, res) => {
    try {
        const newproduct = {
            productname: _req.body.productname,
            price: _req.body.price,
            category: _req.body.category
        };
        const token = await jsonwebtoken_1.default.verify(_req.headers.authorization, process.env.TOKENSECRET);
        const result = await productsContext.create(newproduct);
        res.send(result);
    }
    catch (error) {
        res.send("Token failed with product creation ");
    }
};
const show = async (_req, res) => {
    try {
        const id = parseInt(_req.params.id);
        const result = await productsContext.show(id);
        if (result) {
            res.send(result);
        }
        else {
            res.send("this product id is not defined ");
        }
    }
    catch (error) {
        res.send("error with product fetch  ");
    }
};
const index = async (_req, res) => {
    try {
        const result = await productsContext.index();
        res.send(result);
    }
    catch (error) {
        res.send("error with product fetch  ");
    }
};
const GetProductsbyCat = async (_req, res) => {
    try {
        const category = _req.query.category;
        const result = await productsContext.GetProductsbyCat(category);
        res.send(result);
    }
    catch (error) {
        res.send("error with product fetch ");
    }
};
const Producthandler = (app) => {
    app.get("/products", index);
    app.post("/product", create);
    app.get("/product/:id", show);
    app.get("/productcat", GetProductsbyCat);
};
exports.Producthandler = Producthandler;
