import supertest from "supertest";
import app from "../server";
import {OderModel} from "../Models/orders"
//route tests 

const Request = supertest(app);
const ordercontext = new OderModel();

describe("Order Routing test " , () => {
    it("User Close the order (Complete)" , async () => {
        const Response = await Request.post("/orderclose");
        expect(Response.status).toEqual(200);
    })

    it("Create Order" , async () => {
        const Response = await Request.get("/order/:userid");
        expect(Response.status).toEqual(200);
    })
    it("Get User Complete Orders  " , async () => {
        const Response = await Request.get("/order/:userid");
        expect(Response.status).toEqual(200);
    })
})


describe("Order database queries test " , () => {
    it("Order data" ,async () => {
        const res = await ordercontext.index(0, "active");
        expect(res).toBeTruthy();
    }) 
    it("Order creation" , async () => {
        const res = await ordercontext.create(2);
        expect(res).toBeTruthy();
    })
})


