"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const usershandler_1 = require("./api/routes/usershandler");
const ordershandler_1 = require("./api/routes/ordershandler");
const productsHandler_1 = require("./api/routes/productsHandler");
const dashboardHandler_1 = require("./api/routes/dashboardHandler");
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
const corsoption = {
    origin: "*"
};
app.use((0, cors_1.default)(corsoption));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, usershandler_1.Userhandler)(app);
(0, ordershandler_1.Orderhandler)(app);
(0, productsHandler_1.Producthandler)(app);
(0, dashboardHandler_1.DashboardHandler)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
