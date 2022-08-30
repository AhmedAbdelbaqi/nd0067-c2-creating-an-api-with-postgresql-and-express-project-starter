import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const passwordhash = async (password : string) :Promise<string> => {
    const pepperpass = password + process.env.PASSWORDPEPPER;
    const hashed = await bcrypt.hash(pepperpass, parseInt(process.env.SALTROUNDS as string));
    return hashed;
}

const comparepass =async (hasedpassword:string , plainedpassword :string ) : Promise<boolean>=> {
    const pepperdpassword  = plainedpassword+ process.env.PASSWORDPEPPER;
    const result = await bcrypt.compare(pepperdpassword , hasedpassword);
    return result;
}

export {passwordhash , comparepass}  