import { Markup } from "telegraf";
import { CommandsConstants } from "../../Constants/CommandsConstants";
import MessageButtonResponse from "../../Models/Response/MessageButtonResponse";

export const BotRepoInfoCommand= () => {
    const buttons: object = Markup.inlineKeyboard([
        Markup.button.url('GitHub Repository', CommandsConstants.botRepo, false)
    ])
    let botRepo: string = CommandsConstants.botRepo;
    return new MessageButtonResponse(botRepo, buttons);
}