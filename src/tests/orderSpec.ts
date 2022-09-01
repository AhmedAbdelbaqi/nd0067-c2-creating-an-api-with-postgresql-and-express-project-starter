import supertest from "supertest";
import app from "../server";
//route tests 

const Request = supertest(app);

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