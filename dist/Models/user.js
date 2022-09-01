"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const database_1 = __importDefault(require("../database"));
const passwordhash_1 = require("../api/passwordhash");
class UserModel {
    constructor() {
        // user creation 
        this.create = async (user) => {
            try {
                const conn = await database_1.default.connect();
                // hash the password 
                user.password = await (0, passwordhash_1.passwordhash)(user.password);
                const sql = "insert into users (firstname , lastname , password) values ($1,$2,$3) returning *";
                const result = await conn.query(sql, [user.firstname, user.lastname, user.password]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Error with user creation ${error}`);
            }
        };
        // get users List
        this.index = async () => {
            try {
                const conn = await database_1.default.connect();
                const sql = "select id , firstname , lastname from users";
                const result = await conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Error with fetching user list : ${error}`);
            }
        };
        // get user data
        this.show = async (userid) => {
            try {
                const conn = await database_1.default.connect();
                const sql = "select * from users where id = $1";
                const result = await conn.query(sql, [userid]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Error with fetching user data : ${error}`);
            }
        };
        //edit user data
        this.edit = async (user) => {
            try {
                const conn = await database_1.default.connect();
                user.password = await (0, passwordhash_1.passwordhash)(user.password);
                const sql = "update users set firstname = $1 , lastname = $2 , password = $3 where id = $4 returning *";
                const result = await conn.query(sql, [user.firstname, user.lastname, user.password, user.id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Error with editing user data : ${error}`);
            }
        };
        //Delete user 
        this.Delete = async (userid) => {
            try {
                const conn = await database_1.default.connect();
                const sql = "delete from users where id = $1 returning *";
                const result = await conn.query(sql, [userid]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Error with deleting user : ${error}`);
            }
        };
        // check if the user exists
        this.check = async (firstname, lastname) => {
            try {
                const conn = await database_1.default.connect();
                const sql = "select * from users where firstname = $1 and lastname = $2";
                const result = await conn.query(sql, [firstname, lastname]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Error with checking user : ${error}`);
            }
        };
        this.passwordcheck = async (password, userid) => {
            try {
                const conn = await database_1.default.connect();
                const sql = "select password from users where id =  $1";
                const hashed = await conn.query(sql, [userid]);
                const check = await (0, passwordhash_1.comparepass)(hashed.rows[0].password, password);
                conn.release();
                return check;
            }
            catch (error) {
                throw new Error(`Error with passwordcheck  : ${error}`);
            }
        };
    }
}
exports.UserModel = UserModel;
