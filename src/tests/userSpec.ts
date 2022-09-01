
import supertest from "supertest";
import app from "../server";
import {user, UserModel } from "../Models/user";

//route tests 

const Request = supertest(app);
const usercontext = new UserModel();



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

describe("User database queries test " , () => {
    it("User data" ,async () => {
        const res = await usercontext.index();
        expect(res).toBeTruthy();
    }) 
    it("user creation" , async () => {
        const res = await usercontext.create({firstname:"ahmed" , lastname:"Elsadek" , password : "123"})
        expect(res).toBeTruthy();
    })
})


