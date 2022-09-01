"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OderModel = void 0;
const database_1 = __importDefault(require("../database"));
class OderModel {
    constructor() {
        // Order Creation 
        this.create = async (userid) => {
            try {
                const conn = await database_1.default.connect();
                const sql = "insert into orders (orderstatus,userid) values ('active',$1) returning *";
                const result = await conn.query(sql, [userid]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Error with order creation ${error}`);
            }
        };
        // get Orders of specific user
        this.index = async (userid, orderstatus = "active") => {
            try {
                const conn = await database_1.default.connect();
                const sql = "select * from orders where userid = $1 and orderstatus = $2";
                const result = await conn.query(sql, [userid, orderstatus]);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Error with orders fetching  ${error}`);
            }
        };
        // Order Close 
        this.Close = async (userid, orderid) => {
            try {
                const conn = await database_1.default.connect();
                const sql = "update orders set orderstatus = 'complete' where userid = $1 and id = $2 returning *";
                const result = await conn.query(sql, [userid, orderid]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Error with order closing  ${error}`);
            }
        };
        this.orderUserCheck = async (userid, orderid) => {
            try {
                const conn = await database_1.default.connect();
                const sql = "select orderstatus from orders where userid = $1 and id =$2 ";
                const result = await conn.query(sql, [userid, orderid]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Error with order check  ${error}`);
            }
        };
    }
}
exports.OderModel = OderModel;
