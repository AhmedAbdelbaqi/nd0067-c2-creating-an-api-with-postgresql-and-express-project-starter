import express from "express";
import { Dashboard } from "../dashboard";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


const DashboardContext = new Dashboard();

const addProducts = async (_req:express.Request, res:express.Response) => {
        const orderid = parseInt(_req.query.orderid as string) ;
        const productid = parseInt(_req.query.productid as string);
        
        const user = await DashboardContext.GetUserFromOrder(orderid);
        if (user?.userid) {
                try {
                        const token = jwt.verify(_req.headers.authorization as string ,process.env.TOKENSECRET as string ) as jwt.JwtPayload;
                        if (token.id == user.userid ) {
                                const Quantity = parseInt(_req.body.Quantity) ;
                                const result = await DashboardContext.addProducts(orderid,productid,Quantity);
                                res.send(result);
                        }else {
                                res.send("invalid user ");
                        }
                } catch (error) {
                        res.send("invalid token user id  , or quantity error ");
                }        
        }  else {
                res.send("the order is closed");
        }
}

const GetPopularProduct = async (_req:express.Request, res:express.Response) => {
        const result = await DashboardContext.GetPopularProduct();
        res.send(result);
}

export const DashboardHandler = (app:express.Application) => {
        app.post("/productsorder" , addProducts);
        app.get("/PopularProduct" , GetPopularProduct);
}