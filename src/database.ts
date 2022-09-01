import pg, { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config();
const {
    POSTGRES_HOST, 
    POSTGRES_PORT,
    POSTGRES_DB , 
    POSTGRES_USER ,
    POSTGRES_PASSWORD,
    TEST_DATABASE,
    TEST_USER,
    TEST_PASSWORD
} = process.env

let client = new Pool();


if (process.env.ENV == "dev" ){
    client = new Pool ({
        host : POSTGRES_HOST,
        database :POSTGRES_DB,
        port : parseInt(POSTGRES_PORT as string)  ,
        user : POSTGRES_USER,
        password : POSTGRES_PASSWORD
    })
}else if (process.env.ENV == "test") {
    client = new Pool ({
        host : POSTGRES_HOST,
        database :TEST_DATABASE,
        port : parseInt(POSTGRES_PORT as string)  ,
        user : POSTGRES_USER,
        password : POSTGRES_PASSWORD
    })
}

export default client;



