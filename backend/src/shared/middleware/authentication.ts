import {NextFunction, Request, Response} from "express";
import jsonwebtoken from "jsonwebtoken";
import RequestResponseMappings from "../responseMapping";

export default {
    isAuthentication:(req:Request,res:Response,next:NextFunction)=>{
        try{
        let token=req.header('Authorization')?.split(' ')[1]
         req.body.tokenInfo=jsonwebtoken.verify(token!,'secretKey');
         next();
        }catch (e:any) {
            return RequestResponseMappings.sendErrorMessage(res,{},e.message,401);
        }
    }
}
