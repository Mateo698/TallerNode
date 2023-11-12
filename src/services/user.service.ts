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
}