import { Express } from "express";
import userController from "../controllers/user.controller";
import auth from "../middleware/auth";
import validateSchema from "../middleware/validateSchema";
import { UserSchema } from "../schemas/user.schema";
import { GroupSchema } from "../schemas/group.schema";

const routes = (app: Express) => {
    app.post("/user",auth,validateSchema, userController.create);
    app.get("/user/:id",auth, userController.getUserData);
    app.put("/user/:id",auth,validateSchema, userController.updateUser);
    app.delete("/user/:id",auth, userController.deleteUser);
    
