"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Userhandler = void 0;
const user_1 = require("../../Models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const UserContext = new user_1.UserModel();
const usercheck = async (_req, res, next) => {
    const firstname = _req.body.firstname;
    const lastname = _req.body.lastname;
    const result = await UserContext.check(firstname, lastname);
    if (result) {
        res.locals.user = result;
        next();
    }
    else {
        next();
    }
};
const checkpassword = async (_req, res, next) => {
    if (res.locals.user) {
        const password = _req.body.password;
        const passwordcheck = await UserContext.passwordcheck(password, res.locals.user.id);
        if (passwordcheck) {
            next();
        }
        else {
            res.send("Authentication failed");
        }
    }
    else {
        res.send("User not exists");
    }
};
const create = async (_req, res) => {
    if (!res.locals.user) {
        const newuser = {
            firstname: _req.body.firstname,
            lastname: _req.body.lastname,
            password: _req.body.password
        };
        const result = await UserContext.create(newuser);
        res.send(result);
    }
    else {
        res.send("User Already Exists");
    }
};
const index = async (_req, res) => {
    try {
        const token = _req.headers.authorization;
        const verify = jsonwebtoken_1.default.verify(token, process.env.TOKENSECRET);
        const result = await UserContext.index();
        res.send(result);
    }
    catch (error) {
        res.send("Token Failed - index ");
    }
};
const show = async (_req, res) => {
    try {
        const token = _req.headers.authorization;
        const verify = jsonwebtoken_1.default.verify(token, process.env.TOKENSECRET);
        const id = parseInt(_req.params.id);
        if (verify.id == id) {
            const result = await UserContext.show(id);
            res.send(result);
        }
        else {
            res.send("Authorization  Failed");
        }
    }
    catch (error) {
        res.send("Token Failed to show the user data ");
    }
};
const signin = async (_req, res) => {
    const token = await jsonwebtoken_1.default.sign(res.locals.user, process.env.TOKENSECRET);
    const obj = { "token": token, "user id": res.locals.user.id };
    res.send(obj);
};
const edit = async (_req, res) => {
    const token = _req.headers.authorization;
    const userid = parseInt(_req.params.id);
    try {
        const verify = jsonwebtoken_1.default.verify(token, process.env.TOKENSECRET);
        if (verify.id == userid) {
            const modifieduser = {
                id: userid,
                firstname: _req.body.firstname,
                lastname: _req.body.lastname,
                password: _req.body.password
            };
            const result = await UserContext.edit(modifieduser);
            res.send(result);
        }
        else {
            res.send("Not matched token ");
        }
    }
    catch (error) {
        res.send("Token error , unsigned token ");
    }
};
const Userhandler = (app) => {
    app.get("/users", index);
    app.get("/user/:id", show);
    app.post("/user", usercheck, create);
    app.get("/signin", usercheck, checkpassword, signin);
    app.post("/user/:id/modify", edit);
};
exports.Userhandler = Userhandler;
