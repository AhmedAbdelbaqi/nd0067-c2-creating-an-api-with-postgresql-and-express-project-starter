"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Userhandler = void 0;
var user_1 = require("../../Models/user");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var UserContext = new user_1.UserModel();
var usercheck = function (_req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var firstname, lastname, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                firstname = _req.body.firstname;
                lastname = _req.body.lastname;
                return [4 /*yield*/, UserContext.check(firstname, lastname)];
            case 1:
                result = _a.sent();
                if (result) {
                    res.locals.user = result;
                    next();
                }
                else {
                    next();
                }
                return [2 /*return*/];
        }
    });
}); };
var checkpassword = function (_req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var password, passwordcheck;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!res.locals.user) return [3 /*break*/, 2];
                password = _req.body.password;
                return [4 /*yield*/, UserContext.passwordcheck(password, res.locals.user.id)];
            case 1:
                passwordcheck = _a.sent();
                if (passwordcheck) {
                    next();
                }
                else {
                    res.send("Authentication failed");
                }
                return [3 /*break*/, 3];
            case 2:
                res.send("User not exists");
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
var create = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newuser, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!res.locals.user) return [3 /*break*/, 2];
                newuser = {
                    firstname: _req.body.firstname,
                    lastname: _req.body.lastname,
                    password: _req.body.password
                };
                return [4 /*yield*/, UserContext.create(newuser)];
            case 1:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                res.send("User Already Exists");
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, verify, result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                token = _req.headers.authorization;
                verify = jsonwebtoken_1["default"].verify(token, process.env.TOKENSECRET);
                return [4 /*yield*/, UserContext.index()];
            case 1:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.send("Token Failed - index ");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, verify, id, result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                token = _req.headers.authorization;
                verify = jsonwebtoken_1["default"].verify(token, process.env.TOKENSECRET);
                id = parseInt(_req.params.id);
                if (!(verify.id == id)) return [3 /*break*/, 2];
                return [4 /*yield*/, UserContext.show(id)];
            case 1:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 3];
            case 2:
                res.send("Authorization  Failed");
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                res.send("Token Failed to show the user data ");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var signin = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, obj;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, jsonwebtoken_1["default"].sign(res.locals.user, process.env.TOKENSECRET)];
            case 1:
                token = _a.sent();
                obj = { "token": token, "user id": res.locals.user.id };
                res.send(obj);
                return [2 /*return*/];
        }
    });
}); };
var edit = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, userid, verify, modifieduser, result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = _req.headers.authorization;
                userid = parseInt(_req.params.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                verify = jsonwebtoken_1["default"].verify(token, process.env.TOKENSECRET);
                if (!(verify.id == userid)) return [3 /*break*/, 3];
                modifieduser = {
                    id: userid,
                    firstname: _req.body.firstname,
                    lastname: _req.body.lastname,
                    password: _req.body.password
                };
                return [4 /*yield*/, UserContext.edit(modifieduser)];
            case 2:
                result = _a.sent();
                res.send(result);
                return [3 /*break*/, 4];
            case 3:
                res.send("Not matched token ");
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                res.send("Token error , unsigned token ");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var Userhandler = function (app) {
    app.get("/users", index);
    app.get("/user/:id", show);
    app.post("/user", usercheck, create);
    app.get("/signin", usercheck, checkpassword, signin);
    app.post("/user/:id/modify", edit);
};
exports.Userhandler = Userhandler;
