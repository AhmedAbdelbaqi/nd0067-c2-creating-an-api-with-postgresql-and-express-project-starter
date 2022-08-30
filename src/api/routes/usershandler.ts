import { user,  UserModel } from "../../Models/user";
import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const UserContext = new UserModel();

const usercheck = async (_req: express.Request , res: express.Response , next : express.NextFunction) => {
    const firstname  = _req.body.firstname;
    const lastname  = _req.body.lastname;
    const result = await UserContext.check(firstname, lastname);
    if (result) {
        res.locals.user = result;
        next();
    }else{
        next();
    }
}
const checkpassword = async (_req: express.Request , res: express.Response , next : express.NextFunction) => {
    if (res.locals.user) {
        const password  = _req.body.password;
        const passwordcheck = await UserContext.passwordcheck(password,res.locals.user.id as number)
        if (passwordcheck) {
            next();
        }else {
            res.send("Authentication failed");
        }
    }else {
        res.send("User not exists");
    }
    
}

const create = async (_req: express.Request , res: express.Response) => {
    if (!res.locals.user) { 
        const newuser : user =  {
            firstname : _req.body.firstname ,
            lastname : _req.body.lastname, 
            password : _req.body.password
        }
        const result = await UserContext.create(newuser);
        res.send(result);
    }else {
        res.send("User Already Exists");
    }
}

const index = async (_req: express.Request , res: express.Response) => {
    const result = await UserContext.index();
    res.send(result);
}

const show  = async (_req: express.Request , res: express.Response) => {
    const id  = parseInt(_req.params.id as string) ;
    const result = await UserContext.show(id);
    res.send(result);
}

const signin =async (_req: express.Request , res: express.Response) => {
    const token  = await jwt.sign(res.locals.user, process.env.TOKENSECRET as string);
    const obj = {"token":token , "user id" : res.locals.user.id}
    res.send(obj);
}

const edit = async (_req: express.Request , res: express.Response) => {
    const token = _req.headers.authorization as string;
    const userid = parseInt(_req.params.id) ;
    try {
        const verify = jwt.verify(token,process.env.TOKENSECRET as string) as jwt.JwtPayload;
        if(verify.id == userid) {
            const modifieduser : user = {
                id : userid,
                firstname : _req.body.firstname,
                lastname : _req.body.lastname,
                password : _req.body.password
            }
            const result = await UserContext.edit(modifieduser);
            res.send(result);
        }else {
            res.send("Not matched token ")
        }
    } catch (error) {
        res.send("Token error , unsigned token ")
    }
    

}

export const Userhandler = (app:express.Application) => {
    app.get("/users" , index);
    app.post("/user" , usercheck ,create);
    app.get("/user/signin" , usercheck, checkpassword ,signin);
    app.post("/user/:id/modify"  , edit)
}
