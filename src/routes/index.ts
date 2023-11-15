import { Express } from "express";
import userController from "../controllers/user.controller";
import groupController from "../controllers/group.controller";
import auth from "../middleware/auth";
import validateSchema from "../middleware/validateSchema";
import { UserSchema } from "../schemas/user.schema";
import { GroupSchema } from "../schemas/group.schema";

const routes = (app: Express) => {
    app.post("/user",auth,validateSchema(UserSchema),userController.create);
    app.get("/user/:id",auth, userController.getUserGroups);
    app.put("/user/:id",auth,validateSchema(UserSchema), userController.updateUser);
    app.delete("/user/:id",auth, userController.deleteUser);
    app.put("/user/:id/group",auth, userController.asignUserToGroup);
    app.put("/user/:id/group/remove",auth, userController.removeUserFromGroup);

    // Group routes
    
    app.post("/group",auth,validateSchema(GroupSchema), groupController.create);
    app.get("/group/:id",auth, groupController.getGroupData);
    app.get("/group",auth, groupController.getAllGroups);
    app.put("/group/:id",auth, groupController.update);
    app.delete("/group/:id",auth, groupController.delete);
    app.put("/group/:id/user",auth, groupController.addUserToGroup);
    app.put("/group/:id/user/remove",auth, groupController.removeUserFromGroup);
    app.post("/login", userController.authenticate);
    app.post("/register", userController.register);
}

export default routes;
