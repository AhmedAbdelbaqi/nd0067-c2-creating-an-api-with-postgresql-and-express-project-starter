"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
//route tests 
const Request = (0, supertest_1.default)(server_1.default);
describe("User Routing test ", () => {
    it("usersIndex", async () => {
        const Response = await Request.get("/users");
        expect(Response.status).toEqual(200);
    });
    it("User Data", async () => {
        const Response = await Request.get("/user/:id");
        expect(Response.status).toEqual(200);
    });
    it("User Create", async () => {
        const Response = await Request.post("/user");
        expect(Response.status).toEqual(200);
    });
    it("User Signin", async () => {
        const Response = await Request.get("/signin");
        expect(Response.status).toEqual(200);
    });
    it("User Modify", async () => {
        const Response = await Request.post("/user/:id/modify");
        expect(Response.status).toEqual(200);
    });
});
