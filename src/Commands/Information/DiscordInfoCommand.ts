import { Markup } from "telegraf";
import { CommandsConstants } from "../../Constants/CommandsConstants";
import MessageButtonResponse from "../../Models/Response/MessageButtonResponse";

export const DiscordInfoCommand= () => {
    const buttons: object = Markup.inlineKeyboard([
        Markup.button.url('Rasta Discord', CommandsConstants.discord, false)
    ])
    let discord: string = CommandsConstants.discord;
    return new MessageButtonResponse(discord, buttons);
}