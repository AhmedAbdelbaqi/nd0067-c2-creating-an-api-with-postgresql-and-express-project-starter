import client from "../database"
type user = {
    id? : number , 
    fisrtname : string , 
    lastname : string , 
    password : string 
}

// user creation 
const create = async (user : user):Promise <user> => {
    const conn = await client.connect();
    const sql = "insert into users (firstname , lastname , password) values ($1,$2,$3) returning *";
    const result =  await conn.query(sql , [user.fisrtname, user.lastname, user.password]);
    return result.rows[0]
}