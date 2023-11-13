import User from "../models/user.model";
import UserModel, { UserInput, UserDocument } from "../models/user.model";
import jwt from "jsonwebtoken";

class UserService{
    public async create(userInput: UserInput): Promise<UserDocument>{
        try{
            const user = await UserModel.create(userInput);
            return user;
        } catch(error){
            throw error;
        }
    }

    public async findById(id: string): Promise<UserDocument | null>{
        try{
            const userExists = await UserModel.findById(id);
            return userExists;
        } catch(error){
            throw error;
        }
    }

    public async findByEmail(email: string): Promise<UserDocument | null>{
        try{
            const userExists = await UserModel.findOne({email: email});
            return userExists;
        } catch(error){
            throw error;
        }
    }

    public async updateUser(user: UserDocument, userInput: UserInput): Promise<UserDocument | null>{
        try{
            const updatedUser = await UserModel.findByIdAndUpdate(user._id, userInput, {new: true});
            return updatedUser;
        } catch(error){
            throw error;
        }
    }

    public async deleteUser(user: UserDocument): Promise<UserDocument | null>{
        try{
            const deletedUser = await UserModel.findByIdAndDelete(user._id);
            return deletedUser;
        }catch(error){
            throw error;
        }
    } 

    public async asignUserToGroup(user: UserDocument, groupId: string): Promise<UserDocument | null>{
        try {
            const updatedUser = UserModel.findByIdAndUpdate(user._id, {$push: {groups: groupId}}, {new: true});
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }

    public async removeUserFromGroup(user: UserDocument, groupId: string): Promise<UserDocument | null>{
        try {
            const updatedUser = UserModel.findByIdAndUpdate(user._id, {$pull: {groups: groupId}}, {new: true});
            return updatedUser;
        } catch (error) {
            throw error;
        }
    }

    public async getUserAndGroups(id: string): Promise<UserDocument | null>{
        try {
            const user: UserDocument | null = await UserModel.findById(id).populate("groups");
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async generateToken(user: UserDocument): Promise<string>{
        try {
            const token = jwt.sign({user_id: user._id,user_email:user.email,user_role:user.role}, process.env.TOKEN_SECRET || "tokenTest", {expiresIn: "1d"});
            return token;
        } catch (error) {
            throw error;
        }
    }
}

export default new UserService();