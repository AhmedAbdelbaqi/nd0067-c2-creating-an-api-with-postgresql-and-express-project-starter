import client from "../database"

export class Dashboard {
    // add products to order 
    addProducts = async (orderid : number , productid : number,quantity:number) : 
    Promise<{orderid : number , productid : number}> => {
        try {
            const conn = await client.connect();
            const sql = "insert into ordersProducts (orderid,productid,Quantity) values ($1,$2,$3) returning *";
            const result = await conn.query(sql,[orderid,productid,quantity]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Please check the corrent order and products id ${error}`);
            
        }
    }

    GetUserFromOrder = async (orderid:number) : Promise<{userid: number } | undefined > => {
        try {
            const conn = await client.connect(); 
            const sql = "select userid from orders where id = $1 and orderstatus = 'active'";
            const result = await conn.query(sql,[orderid]);
            return result.rows[0];
        } catch (error) {
            throw new Error(`Please check the corrent order id ${error}`);  
        }
    }

    GetPopularProduct = async () : 
    Promise <{  productid :number , 
                productname : string }> => {
            try {
                const conn = await client.connect(); 
                const sql = `select  products.id , productname , price , category , sum(ordersProducts.Quantity) as total 
                             from products inner join ordersProducts on ordersProducts.productid = products.id
				             group by products.id order by total desc limit 1 `;
                const result = await conn.query(sql);
                return result.rows[0];
            } catch (error) {
                throw new Error(`Please check the corrent order id ${error}`);  
            }   
    }





}