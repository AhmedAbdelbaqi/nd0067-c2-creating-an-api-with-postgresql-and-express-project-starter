"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardHandler = void 0;
const dashboard_1 = require("../dashboard");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const DashboardContext = new dashboard_1.Dashboard();
const addProducts = async (_req, res) => {
    const orderid = parseInt(_req.query.orderid);
    const productid = parseInt(_req.query.productid);
    const user = await DashboardContext.GetUserFromOrder(orderid);
    if (user?.userid) {
        try {
            const token = jsonwebtoken_1.default.verify(_req.headers.authorization, process.env.TOKENSECRET);
            if (token.id == user.userid) {
                const Quantity = parseInt(_req.body.Quantity);
                const result = await DashboardContext.addProducts(orderid, productid, Quantity);
                res.send(result);
            }
            else {
                res.send("invalid user ");
            }
        }
        catch (error) {
            res.send("invalid token user id  , or quantity error ");
        }
    }
    else {
        res.send("the order is closed");
    }
};
const GetPopularProduct = async (_req, res) => {
    const result = await DashboardContext.GetPopularProduct();
    res.send(result);
};
const DashboardHandler = (app) => {
    app.post("/productsorder", addProducts);
    app.get("/PopularProduct", GetPopularProduct);
};
exports.DashboardHandler = DashboardHandler;
