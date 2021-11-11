import { Markup } from "telegraf";
import { CommandsConstants } from "../../Constants/CommandsConstants";
import MessageButtonResponse from "../../Models/Response/MessageButtonResponse";

export const WebInfoCommand = () => {
    const buttons: object = Markup.inlineKeyboard([
        Markup.button.url('Rasta Website', CommandsConstants.discord, false)
    ])
    let website: string = CommandsConstants.officialWeb;
    return new MessageButtonResponse(website, buttons);
}