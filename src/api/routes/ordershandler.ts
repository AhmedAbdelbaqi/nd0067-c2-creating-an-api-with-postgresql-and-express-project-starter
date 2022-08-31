import {order, OderModel } from "../../Models/orders";
import express  from "express";
import jwt from "jsonwebtoken";


const OrdeContext = new OderModel();


const create =  async (_req:express.Request, res : express.Response) => {
    try {
        const userid = parseInt(_req.params.userid) ;
        const token  = await jwt.verify(_req.headers.authorization as string, process.env.TOKENSECRET as string) as jwt.JwtPayload;
        if (token.id == userid ) {
            const result = await OrdeContext.create(userid);
            res.send(result);
        } else {
            res.send("Authentication Failed - order creation ");
        }
    } catch (error) {
        res.send("Token error , unsigned token ")
    }
}

const Getorder = async (_req:express.Request, res : express.Response) => {
    try {
        const userid = parseInt(_req.params.userid) ;
        const token  = await jwt.verify(_req.headers.authorization as string, process.env.TOKENSECRET as string) as jwt.JwtPayload;
        if (token.id == userid ) {
            const result = await OrdeContext.index(userid);
            res.send(result);
        } else {
            res.send("Authentication Failed - order fetching ");
        }
    } catch (error) {
        res.send("Token error , unsigned token - get user orders " + error)
    }
}

const Closeorder = async (_req:express.Request, res : express.Response) => {
    try {
        const userid = parseInt(_req.params.userid);
        const orderid = parseInt(_req.params.orderid);
        const token  = await jwt.verify(_req.headers.authorization as string, process.env.TOKENSECRET as string) as jwt.JwtPayload;
        if (token.id == userid ) {
            const result = await OrdeContext.Close(userid,orderid);
            res.send(result);
        } else {
            res.send("Authentication Failed - order fetching ");
        }
    } catch (error) {
        res.send("Token error , unsigned token ")
    }
}

const orderUserCheck = async (_req:express.Request, res : express.Response , next : express.NextFunction) => {
    try {
        const userid = parseInt(_req.params.userid);
        const orderid = parseInt(_req.params.orderid);
        const result = await OrdeContext.orderUserCheck(userid,orderid);
        if (result?.orderstatus== "active") {
            next();
        }else if (result?.orderstatus == "complete") { 
            res.send("this order already Closed");     
        }else if (result == undefined){
            res.send("this order don't belong to you ");
        }
    } catch (error) {
        
    }
}



export const Orderhandler =  (app:express.Application) => {
    app.post("/order/:userid" , create);
    app.get("/order/:userid" , Getorder);
    app.post("/order/:userid/:orderid/close", orderUserCheck,Closeorder);
}

