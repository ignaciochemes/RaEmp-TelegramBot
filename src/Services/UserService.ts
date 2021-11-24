import { TextConstants } from "../Constants/TextConstants";
import UserDao from "../Daos/UserDao";
import { UserRequestModel } from "../Models/Request/User/UserRequestModel";
import BanUserResponse from "../Models/Response/BanUserResponse";
import MuteUserResponse from "../Models/Response/MuteUserResponse";

export default class UserService {

    static async banUser(data: any, administrators: any): Promise<BanUserResponse> {
        if(!data.reply_to_message) return new BanUserResponse(null, false, "No se puede banear a un usuario que no responde a un mensaje");
        for(let i = 0; i < administrators.length; i++) {
            if(administrators[i].user.id === data.from.id) {
                let user = new UserRequestModel(data);
                const findUser = await UserDao.getUser(user.getToUserId());
                if(findUser[0].isBan() === true) return new BanUserResponse(user.getToUserId(), false, TextConstants.alreadyBannedUser);
                user.setBan(true);
                user.setBanDescription(data.text);
                if(findUser[0].isMute() === true) {
                    user.setMute(true);
                    user.setMuteDescription(findUser[0].getMuteDescription());
                }
                if(!findUser[0] && findUser.length === 0) {
                    await UserDao.saveUser(user);
                    return new BanUserResponse(user.getToUserId(), true, TextConstants.successfullyBanUser);
                }
                await UserDao.updateUser(user);
                return new BanUserResponse(user.getToUserId(), true, TextConstants.successfullyBanUser);
            }
        }
        return new BanUserResponse(null, false, TextConstants.haventPermission);
    }

    static async muteUser(data: any, administrators: any): Promise<MuteUserResponse> {
        if(!data.reply_to_message) return new MuteUserResponse(null, false, "No se puede silenciar a un usuario que no responde a un mensaje");
        for(let i = 0; i < administrators.length; i++) {
            if(administrators[i].user.id === data.from.id) {
                let user = new UserRequestModel(data);
                const findUser = await UserDao.getUser(user.getToUserId());
                if(findUser[0].isMute() === true) return new MuteUserResponse(user.getToUserId(), false, TextConstants.alreadyMutedUser);
                user.setMute(true);
                user.setMuteDescription(data.text);
                if(findUser[0].isBan() === true) {
                    user.setBan(true);
                    user.setBanDescription(findUser[0].getBanDescription());
                }
                if(!findUser[0] && findUser.length === 0) {
                    await UserDao.saveUser(user);
                    return new MuteUserResponse(user.getToUserId(), true, TextConstants.successfullyMuteUser);
                }
                await UserDao.updateUser(user);
                return new MuteUserResponse(user.getToUserId(), true, TextConstants.successfullyMuteUser);
            }
        }
        return new MuteUserResponse(null, false, TextConstants.haventPermission);
    }
}