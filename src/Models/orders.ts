import client from "../database";


type order = {
    id? : number , 
    orderstatus : string , 
    userid : number 
}

export class OderModel {
    // Order Creation 
    create = async (userid : number):Promise <order> => {
        try {
            const conn = await client.connect();
            const sql = "insert into orders (orderstatus,userid) values ('open',$1) returning *";
            const result =  await conn.query(sql , [userid]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error with order creation ${error}`);
        }
    }

    // get Orders of specific user
    index = async (userid : number):Promise <order[]> => {
        try {
            const conn = await client.connect();
            const sql = "select * from orders where userid = $1";
            const result =  await conn.query(sql , [userid]);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`Error with orders fetching  ${error}`);
        }
    }

    // Order Close 
    Close = async (userid : number, orderid : number):Promise <order> => {
        try {
            const conn = await client.connect();
            const sql = "update orders set orderstatus = 'closed' where userid = $1 and id = $2 returning *";
            const result =  await conn.query(sql , [userid , orderid]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error with order closing  ${error}`);
        }
    }

    orderUserCheck = async (userid : number, orderid : number):Promise <order>  => {
        try {
            const conn = await client.connect();
            const sql = "select * from orders where userid = $1 and id =$2 ";
            const result =  await conn.query(sql , [userid , orderid]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Error with order check  ${error}`);
        }
    }


}