import bcrypt from "bcrypt";
import dotenv from "dotenv"

dotenv.config();

export const passwordhash = async (password : string) :Promise<string> {
    const pepperpass = password + process.env.PASSWORDPEPPER;
    const hashed = await bcrypt.hash(pepperpass, parseInt(process.env.SALTROUNDS as string));
    return hashed;
}