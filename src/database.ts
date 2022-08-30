import pg, { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config();
const {
    host : POSTGRES_HOST, 
    port : POSTGRES_PORT,
    db  : POSTGRES_DB , 
    user : POSTGRES_USER ,
    password : POSTGRES_PASSWORD
} = process.env

let client = new Pool();


if (process.env.ENV == "dev" ){
    client = new Pool ({
        host : POSTGRES_HOST,
        port : parseInt(POSTGRES_PORT as string)  ,
        user : POSTGRES_USER,
        password : POSTGRES_PASSWORD
    })
}

export default client;



