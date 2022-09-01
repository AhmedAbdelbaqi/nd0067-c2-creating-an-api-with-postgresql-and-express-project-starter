"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orderhandler = void 0;
const orders_1 = require("../../Models/orders");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const OrdeContext = new orders_1.OderModel();
const create = async (_req, res) => {
    try {
        const userid = parseInt(_req.params.userid);
        const token = await jsonwebtoken_1.default.verify(_req.headers.authorization, process.env.TOKENSECRET);
        if (token.id == userid) {
            const result = await OrdeContext.create(userid);
            res.send(result);
        }
        else {
            res.send("Authentication Failed - order creation ");
        }
    }
    catch (error) {
        res.send("Token error , unsigned token ");
    }
};
const Getorder = async (_req, res) => {
    try {
        const userid = parseInt(_req.params.userid);
        const status = _req.body.status;
        const token = await jsonwebtoken_1.default.verify(_req.headers.authorization, process.env.TOKENSECRET);
        if (token.id == userid) {
            const result = await OrdeContext.index(userid, status);
            res.send(result);
        }
        else {
            res.send("Authentication Failed - order fetching ");
        }
    }
    catch (error) {
        res.send("Token error , unsigned token - get user orders " + error);
    }
};
const Closeorder = async (_req, res) => {
    try {
        const userid = parseInt(_req.body.userid);
        const orderid = parseInt(_req.body.orderid);
        const token = await jsonwebtoken_1.default.verify(_req.headers.authorization, process.env.TOKENSECRET);
        if (token.id == userid) {
            const result = await OrdeContext.Close(userid, orderid);
            res.send(result);
        }
        else {
            res.send("Authentication Failed - order fetching ");
        }
    }
    catch (error) {
        res.send("Token error , unsigned token ");
    }
};
const orderUserCheck = async (_req, res, next) => {
    try {
        const userid = parseInt(_req.body.userid);
        const orderid = parseInt(_req.body.orderid);
        const result = await OrdeContext.orderUserCheck(userid, orderid);
        if (!result) {
            res.send("this order don't belong to you ");
        }
        else {
            if (result?.orderstatus == "active") {
                next();
            }
            else if (result?.orderstatus == "complete") {
                res.send("this order already Closed");
            }
        }
    }
    catch (error) {
        res.send("Error with Data");
    }
};
const Orderhandler = (app) => {
    app.post("/order/:userid", create);
    app.get("/order/:userid", Getorder);
    app.post("/orderclose", orderUserCheck, Closeorder);
};
exports.Orderhandler = Orderhandler;
