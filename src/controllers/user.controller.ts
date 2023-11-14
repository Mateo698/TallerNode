import { Request,Response } from "express";
import userService from "../services/user.service";
import { UserInput,UserDocument } from "../models/user.model";
import bcrypt from "bcrypt";


class UserController{
    public async create(req: Request, res: Response): Promise<Response>{
        try {
            const userExists: UserDocument | null = await userService.findByEmail(req.body.email);
            if(userExists) return res.status(400).json({message: "User already exists"});
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const user: UserDocument = await userService.create(req.body as UserInput);
            return res.status(201).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    } 

    public async getUserData(req: Request, res: Response): Promise<Response>{
        try {
            const user: UserDocument | null = await userService.findById(req.params.id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async updateUser(req: Request, res: Response): Promise<Response>{
        try {
            const user: UserDocument | null = await userService.findById(req.params.id);
            if(!user) return res.status(404).json({message: "User not found"});
            const updatedUser: UserDocument | null = await userService.updateUser(user, req.body as UserInput);
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<Response>{
        try {
            const user: UserDocument | null = await userService.findById(req.params.id);
            if(!user) return res.status(404).json({message: "User not found"});
            const deletedUser: UserDocument | null = await userService.deleteUser(user);
            return res.status(200).json(deletedUser);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async asignUserToGroup(req: Request, res: Response): Promise<Response>{
        try {
            const user: UserDocument | null = await userService.findById(req.params.id);
            if(!user) return res.status(404).json({message: "User not found"});
            const updatedUser: UserDocument | null = await userService.asignUserToGroup(user, req.body.groupId);
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async removeUserFromGroup(req: Request, res: Response): Promise<Response>{
        try {
            const user: UserDocument | null = await userService.findById(req.params.id);
            if(!user) return res.status(404).json({message: "User not found"});
            const updatedUser: UserDocument | null = await userService.removeUserFromGroup(user, req.body.groupId);
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async getUserGroups(req: Request, res: Response): Promise<Response>{
        try {
            const user: UserDocument | null = await userService.getUserAndGroups(req.params.id);
            if(!user) return res.status(404).json({message: "User not found"});
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    //Authenticates user

    public async authenticate(req: Request, res: Response): Promise<Response>{
        try {
            const user: UserDocument | null = await userService.findByEmail(req.body.email);
            if(!user) return res.status(404).json({message: "User not found"});

            const validPassword: boolean = await bcrypt.compare(req.body.password, user.password);
            if(!validPassword) return res.status(401).json({message: "Invalid credentials"});

            const token: string = await userService.generateToken(user);
            return res.status(200).json({token: token});
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async register(req: Request, res: Response): Promise<Response>{
        try {
            const userExists: UserDocument | null = await userService.findByEmail(req.body.email);
            if(userExists) return res.status(400).json({message: "User already exists"});
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const user: UserDocument = await userService.create(req.body as UserInput);
            const token: string = await userService.generateToken(user);
            return res.status(201).json({token: token});
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

export default new UserController();