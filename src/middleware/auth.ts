import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
    let token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied" });
    token = token.replace("Bearer ", "");
    try {
        const userInfo:any = jwt.verify(token, process.env.JWT_KEY!);
        if(userInfo && userInfo.user_role === "superadmin") {
            return next();
        }else{
            return res.status(401).json({ message: "Access denied" });
        }
    }catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default auth;
