import GroupModel, {GroupInput, GroupDocument} from "../models/group.model";

class GroupService{
    public async create(groupInput: GroupInput): Promise<GroupDocument>{
        try{
            const group = await GroupModel.create(groupInput);
            return group;
        } catch(error){
            throw error;
        }
    }

    public async findAll(): Promise<GroupDocument[]>{
        try{
            const groups = await GroupModel.find();
            return groups;
        } catch(error){
            throw error;
        }
    }

    public async update(group: GroupDocument, groupInput: GroupInput): Promise<GroupDocument | null>{
        try {
            const updatedGroup = await GroupModel.findByIdAndUpdate(group._id, groupInput, {new: true});
            return updatedGroup;
        } catch (error) {
            throw error;
        }
    }

    public async delete(group: GroupDocument): Promise<GroupDocument | null>{
        try {
            const deletedGroup = await GroupModel.findByIdAndDelete(group._id);
            return deletedGroup;
        } catch (error) {
            throw error;
        }
    }

    public async addUserToGroup(group: GroupDocument, userId: string): Promise<GroupDocument | null>{
        try {
            const updatedGroup = GroupModel.findByIdAndUpdate(group._id, {$push: {users: userId}}, {new: true});
            return updatedGroup;
        } catch (error) {
            throw error;
        }
    }

    public async removeUserFromGroup(group: GroupDocument, userId: string): Promise<GroupDocument | null>{
        try {
            const updatedGroup = GroupModel.findByIdAndUpdate(group._id, {$pull: {users: userId}}, {new: true});
            return updatedGroup;
        } catch (error) {
            throw error;
        }
    }
}