"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, TEST_DATABASE, TEST_USER, TEST_PASSWORD } = process.env;
let client = new pg_1.Pool();
if (process.env.ENV == "dev") {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        port: parseInt(POSTGRES_PORT),
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    });
}
else if (process.env.ENV == "test") {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: TEST_DATABASE,
        port: parseInt(POSTGRES_PORT),
        user: TEST_USER,
        password: TEST_PASSWORD
    });
}
exports.default = client;
