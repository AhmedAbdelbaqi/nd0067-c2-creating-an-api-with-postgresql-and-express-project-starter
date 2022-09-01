"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparepass = exports.passwordhash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const passwordhash = async (password) => {
    const pepperpass = password + process.env.PASSWORDPEPPER;
    const hashed = await bcrypt_1.default.hash(pepperpass, parseInt(process.env.SALTROUNDS));
    return hashed;
};
exports.passwordhash = passwordhash;
const comparepass = async (hasedpassword, plainedpassword) => {
    const pepperdpassword = plainedpassword + process.env.PASSWORDPEPPER;
    const result = await bcrypt_1.default.compare(pepperdpassword, hasedpassword);
    return result;
};
exports.comparepass = comparepass;
