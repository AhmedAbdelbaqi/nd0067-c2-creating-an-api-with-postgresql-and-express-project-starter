import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const passwordhash = async (password : string) :Promise<string> => {
    try {
        const pepperpass = password + process.env.PASSWORDPEPPER;
        const hashed = await bcrypt.hash(pepperpass, parseInt(process.env.SALTROUNDS as string));
        return hashed;
    } catch (error) {
        throw new Error("Error With password hashing ");
        
    }

}

const comparepass =async (hasedpassword:string , plainedpassword :string ) : Promise<boolean>=> {
    try {
        const pepperdpassword  = plainedpassword+ process.env.PASSWORDPEPPER;
        const result = await bcrypt.compare(pepperdpassword , hasedpassword);
        return result;
    } catch (error) {
        throw new Error("Error with comparing the password funtionality ");
    }

}

export {passwordhash , comparepass}  