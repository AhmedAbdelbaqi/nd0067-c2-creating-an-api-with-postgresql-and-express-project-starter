
import supertest from "supertest";
import app from "../server";
//route tests 

const Request = supertest(app);

describe("User Routing test " , () => {
    it("usersIndex" , async () => {
        const Response = await Request.get("/users");
        expect(Response.status).toEqual(200);
    })
    it("User Data" , async () => {
        const Response = await Request.get("/user/:id");
        expect(Response.status).toEqual(200);
    })
    it("User Create" , async () => {
        const Response = await Request.post("/user");
        expect(Response.status).toEqual(200);
    })
    it("User Signin" , async () => {
        const Response = await Request.get("/signin");
        expect(Response.status).toEqual(200);
    })
    it("User Modify" , async () => {
        const Response = await Request.post("/user/:id/modify");
        expect(Response.status).toEqual(200);
    })


})