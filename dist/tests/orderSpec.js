"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const orders_1 = require("../Models/orders");
//route tests 
const Request = (0, supertest_1.default)(server_1.default);
const ordercontext = new orders_1.OderModel();
describe("Order Routing test ", () => {
    it("User Close the order (Complete)", async () => {
        const Response = await Request.post("/orderclose");
        expect(Response.status).toEqual(200);
    });
    it("Create Order", async () => {
        const Response = await Request.get("/order/:userid");
        expect(Response.status).toEqual(200);
    });
    it("Get User Complete Orders  ", async () => {
        const Response = await Request.get("/order/:userid");
        expect(Response.status).toEqual(200);
    });
});
describe("Order database queries test ", () => {
    it("Order data", async () => {
        const res = await ordercontext.index(0, "active");
        expect(res).toBeTruthy();
    });
    it("Order creation", async () => {
        await Request.post("/user");
        const res = await ordercontext.create(1);
        expect(res).toBeTruthy();
    });
});
