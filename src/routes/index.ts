import { Express } from "express";
import userController from "../controllers/user.controller";

const routes = (app: Express) => {
    app.post("/users", userController.create);