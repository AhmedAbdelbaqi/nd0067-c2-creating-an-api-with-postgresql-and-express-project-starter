import client from "../database";

export type product = {
    id?:number,
    productname : string , 
    price : number , 
    category : string
}

export class ProductModel {
    create = async (product : product):Promise <product> => {
        try {
            const conn = await client.connect();
            const sql = "insert into products (productname ,price ,category)   values ($1,$2,$3) returning *";
            const result =  await conn.query(sql , [product.productname, product.price, product.category]);
            conn.release();
            return result.rows[0]
        } catch (error) {
            throw new Error(`Error with product creation ${error}`);
        }
    }

    index = async () : Promise<product[]> => {
        try {
            const conn = await client.connect();
            const sql = "select * from products ";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error("Error with products fetching ");
        }
    }

    show = async (productid : number) : Promise<product | undefined> => {
        try {
            const conn = await client.connect();
            const sql = "select * from products where id = $1";
            const result = await conn.query(sql ,[productid]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error("Error with product fetching ");
        }
    }
}