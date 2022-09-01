"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const product_1 = require("../Models/product");
//route tests 
const Request = (0, supertest_1.default)(server_1.default);
const Productcontext = new product_1.ProductModel();
describe("Product Routing test ", () => {
    it("Get Ptoducts", async () => {
        const Response = await Request.get("/products");
        expect(Response.status).toEqual(200);
    });
    it("Create Product", async () => {
        const Response = await Request.post("/product");
        expect(Response.status).toEqual(200);
    });
    it("Get Product Data ", async () => {
        const Response = await Request.get("/product/:id");
        expect(Response.status).toEqual(200);
    });
});
describe("Product database queries test ", () => {
    it("Product data", async () => {
        const res = await Productcontext.index();
        expect(res).toBeTruthy();
    });
    it("Product creation", async () => {
        const res = await Productcontext.create({ productname: "product1", price: 200, category: "cat1" });
        expect(res).toBeTruthy();
    });
});
