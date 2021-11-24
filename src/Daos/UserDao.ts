import { UserSchema } from "../Database/Models/UserModel";
import { UserRequestModel } from "../Models/Request/User/UserRequestModel";

export default class UserDao {
    
    static async saveUser(data: UserRequestModel): Promise<void> {
        let user = new UserSchema(data);
        await user.save();
    }

    static async getUser(id: number): Promise<UserRequestModel[]> {
        let user = await UserSchema.find({ toUserId: id });
        return user;
    }

    static async updateUser(data: UserRequestModel): Promise<void> {
        await UserSchema.findOneAndUpdate({ toUserId: data.getToUserId() }, data);
    }
}