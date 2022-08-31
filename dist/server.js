"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var usershandler_1 = require("./api/routes/usershandler");
var ordershandler_1 = require("./api/routes/ordershandler");
var productsHandler_1 = require("./api/routes/productsHandler");
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use(body_parser_1["default"].json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, usershandler_1.Userhandler)(app);
(0, ordershandler_1.Orderhandler)(app);
(0, productsHandler_1.Producthandler)(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
