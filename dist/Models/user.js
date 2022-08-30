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
exports.UserModel = void 0;
var database_1 = __importDefault(require("../database"));
var passwordhash_1 = require("../api/passwordhash");
var UserModel = /** @class */ (function () {
    function UserModel() {
        var _this = this;
        // user creation 
        this.create = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var conn, _a, sql, result, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _b.sent();
                        // hash the password 
                        _a = user;
                        return [4 /*yield*/, (0, passwordhash_1.passwordhash)(user.password)];
                    case 2:
                        // hash the password 
                        _a.password = _b.sent();
                        sql = "insert into users (firstname , lastname , password) values ($1,$2,$3) returning *";
                        return [4 /*yield*/, conn.query(sql, [user.firstname, user.lastname, user.password])];
                    case 3:
                        result = _b.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        error_1 = _b.sent();
                        throw new Error("Error with user creation ".concat(error_1));
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        // get users List
        this.index = function () { return __awaiter(_this, void 0, void 0, function () {
            var conn, sql, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "select id , firstname , lastname from users";
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.rows];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("Error with fetching user list : ".concat(error_2));
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        // get user data
        this.show = function (userid) { return __awaiter(_this, void 0, void 0, function () {
            var conn, sql, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "select * from users where id = $1";
                        return [4 /*yield*/, conn.query(sql, [userid])];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_3 = _a.sent();
                        throw new Error("Error with fetching user data : ".concat(error_3));
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        //edit user data
        this.edit = function (user) { return __awaiter(_this, void 0, void 0, function () {
            var conn, _a, sql, result, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _b.sent();
                        _a = user;
                        return [4 /*yield*/, (0, passwordhash_1.passwordhash)(user.password)];
                    case 2:
                        _a.password = _b.sent();
                        sql = "update users set firstname = $1 , lastname = $2 , password = $3 where id = $4 returning *";
                        return [4 /*yield*/, conn.query(sql, [user.firstname, user.lastname, user.password, user.id])];
                    case 3:
                        result = _b.sent();
                        return [2 /*return*/, result.rows[0]];
                    case 4:
                        error_4 = _b.sent();
                        throw new Error("Error with editing user data : ".concat(error_4));
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        //Delete user 
        this.Delete = function (userid) { return __awaiter(_this, void 0, void 0, function () {
            var conn, sql, result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "delete from users where id = $1 returning *";
                        return [4 /*yield*/, conn.query(sql, [userid])];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_5 = _a.sent();
                        throw new Error("Error with deleting user : ".concat(error_5));
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        // check if the user exists
        this.check = function (firstname, lastname) { return __awaiter(_this, void 0, void 0, function () {
            var conn, sql, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "select * from users where firstname = $1 and lastname = $2";
                        return [4 /*yield*/, conn.query(sql, [firstname, lastname])];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        error_6 = _a.sent();
                        throw new Error("Error with checking user : ".concat(error_6));
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.passwordcheck = function (password, userid) { return __awaiter(_this, void 0, void 0, function () {
            var conn, sql, hashed, check, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, database_1["default"].connect()];
                    case 1:
                        conn = _a.sent();
                        sql = "select password from users where id =  $1";
                        return [4 /*yield*/, conn.query(sql, [userid])];
                    case 2:
                        hashed = _a.sent();
                        return [4 /*yield*/, (0, passwordhash_1.comparepass)(hashed.rows[0].password, password)];
                    case 3:
                        check = _a.sent();
                        return [2 /*return*/, check];
                    case 4:
                        error_7 = _a.sent();
                        throw new Error("Error with passwordcheck  : ".concat(error_7));
                    case 5: return [2 /*return*/];
                }
            });
        }); };
    }
    return UserModel;
}());
exports.UserModel = UserModel;
