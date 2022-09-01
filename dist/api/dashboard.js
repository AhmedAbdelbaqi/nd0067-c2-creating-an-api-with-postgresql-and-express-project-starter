"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const database_1 = __importDefault(require("../database"));
class Dashboard {
    constructor() {
        // add products to order 
        this.addProducts = async (orderid, productid, quantity) => {
            try {
                const conn = await database_1.default.connect();
                const sql = "insert into ordersProducts (orderid,productid,Quantity) values ($1,$2,$3) returning *";
                const result = await conn.query(sql, [orderid, productid, quantity]);
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Please check the corrent order and products id ${error}`);
            }
        };
        this.GetUserFromOrder = async (orderid) => {
            try {
                const conn = await database_1.default.connect();
                const sql = "select userid from orders where id = $1 and orderstatus = 'active'";
                const result = await conn.query(sql, [orderid]);
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Please check the corrent order id ${error}`);
            }
        };
        this.GetPopularProduct = async () => {
            try {
                const conn = await database_1.default.connect();
                const sql = `select  products.id , productname , price , category , sum(ordersProducts.Quantity) as total 
                             from products inner join ordersProducts on ordersProducts.productid = products.id
				             group by products.id order by total desc limit 1 `;
                const result = await conn.query(sql);
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Please check the corrent order id ${error}`);
            }
        };
    }
}
exports.Dashboard = Dashboard;
