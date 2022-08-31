import client from "../database";
import {passwordhash , comparepass} from "../api/passwordhash"
export type user = {
    id? : number , 
    firstname : string , 
    lastname : string , 
    password : string 
}

export class UserModel {
// user creation 
 create = async (user : user):Promise <user> => {
    try {
        const conn = await client.connect();
        // hash the password 
        user.password = await passwordhash(user.password);
        const sql = "insert into users (firstname , lastname , password) values ($1,$2,$3) returning *";
        const result =  await conn.query(sql , [user.firstname, user.lastname, user.password]);
        conn.release();
        return result.rows[0]
    } catch (error) {
        throw new Error(`Error with user creation ${error}`);
    }
    

}

// get users List
 index = async () :Promise<user[]> => {
    try {
        const conn = await client.connect();
        const sql =  "select id , firstname , lastname from users" ; 
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    } catch (error) {
        throw new Error(`Error with fetching user list : ${error}`);
        
    }
}


// get user data
 show =async (userid : number):Promise<user> => {
    try {
        const conn = await client.connect();
        const sql =  "select * from users where id = $1" ; 
        const result = await conn.query(sql ,[userid]);
        conn.release();
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error with fetching user data : ${error}`);
        
    }
}


//edit user data
 edit =async (user: user):Promise<user> => {
    try {
        const conn = await client.connect();
        user.password = await passwordhash(user.password);
        const sql =  "update users set firstname = $1 , lastname = $2 , password = $3 where id = $4 returning *" ; 
        const result = await conn.query(sql ,[user.firstname , user.lastname, user.password ,user.id]);
        conn.release();
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error with editing user data : ${error}`);
    }
}

//Delete user 
 Delete = async (userid : number) : Promise<user> => {
    try {
        const conn = await client.connect();
        const sql =  "delete from users where id = $1 returning *" ; 
        const result = await conn.query(sql ,[userid]);
        conn.release();
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error with deleting user : ${error}`);
    }
}

// check if the user exists
check = async (firstname : string , lastname : string) : Promise<user> => {
    try {
        const conn = await client.connect();
        const sql =  "select * from users where firstname = $1 and lastname = $2" ; 
        const result = await conn.query(sql ,[firstname , lastname]);
        conn.release();
        return result.rows[0];
    } catch (error) {
        throw new Error(`Error with checking user : ${error}`);
    }
}

passwordcheck =async (password : string, userid:number) : Promise<boolean> => {
    try {
        const conn = await client.connect();
        const sql =  "select password from users where id =  $1" ; 
        const hashed = await conn.query(sql ,[userid]);
        const check = await comparepass(hashed.rows[0].password, password);
        conn.release();
        return check;
    } catch (error) {
        throw new Error(`Error with passwordcheck  : ${error}`);
    }
}

}






