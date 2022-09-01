"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
//route tests 
const Request = (0, supertest_1.default)(server_1.default);
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
