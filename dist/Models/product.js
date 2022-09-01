"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const database_1 = __importDefault(require("../database"));
class ProductModel {
    constructor() {
        this.create = async (product) => {
            try {
                const conn = await database_1.default.connect();
                const sql = "insert into products (productname ,price ,category)   values ($1,$2,$3) returning *";
                const result = await conn.query(sql, [product.productname, product.price, product.category]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Error with product creation ${error}`);
            }
        };
        this.index = async () => {
            try {
                const conn = await database_1.default.connect();
                const sql = "select * from products ";
                const result = await conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error("Error with products fetching ");
            }
        };
        this.show = async (productid) => {
            try {
                const conn = await database_1.default.connect();
                const sql = "select * from products where id = $1";
                const result = await conn.query(sql, [productid]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error("Error with product fetching ");
            }
        };
        this.GetProductsbyCat = async (category) => {
            try {
                const conn = await database_1.default.connect();
                const sql = "select * from products  where category = $1";
                const result = await conn.query(sql, [category]);
                return result.rows;
            }
            catch (error) {
                throw new Error("Please check the correct category  ");
            }
        };
    }
}
exports.ProductModel = ProductModel;
