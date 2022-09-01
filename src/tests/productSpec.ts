import supertest from "supertest";
import app from "../server";
import { ProductModel } from "../Models/product";
//route tests 

const Request = supertest(app);
const Productcontext = new ProductModel();

describe("Product Routing test " , () => {
    it("Get Ptoducts" , async () => {
        const Response = await Request.get("/products");
        expect(Response.status).toEqual(200);
    })

    it("Create Product" , async () => {
        const Response = await Request.post("/product");
        expect(Response.status).toEqual(200);
    })
    it("Get Product Data " , async () => {
        const Response = await Request.get("/product/:id");
        expect(Response.status).toEqual(200);
    })
})

describe("Product database queries test " , () => {
    it("Product data" , async () => {
        const res = await Productcontext.index();
        expect(res).toBeTruthy();
    }) 
    it("Product creation" , async () => {
        const res = await Productcontext.create({productname:"product1" , price : 200 , category : "cat1"});
        expect(res).toBeTruthy();
    })
})