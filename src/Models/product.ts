import client from "../database";

export type product = {
    id?:number,
    productname : string , 
    price : number , 
    category : string
}

class ProductModel {
    create = async (product : product):Promise <product> => {
        try {
            const conn = await client.connect();
            const sql = "insert into products (productname ,price ,category)   values ($1,$2,$3)";
            const result =  await conn.query(sql , [product.productname, product.price, product.category]);
            conn.release();
            return result.rows[0]
        } catch (error) {
            throw new Error(`Error with product creation ${error}`);
        }
    }

    
}