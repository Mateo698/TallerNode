import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Access denied" });
    token = token.replace("Bearer ", "");
    try {
        let sec:string = process.env.JWT_SECRET as string;
        const userInfo:any = jwt.verify(token, sec);
        
        if(userInfo && userInfo.user_role === "superadmin") {
            return next();
        }else{
            return res.status(401).json({ message: "Access denied" });
        }
    }catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default auth;
