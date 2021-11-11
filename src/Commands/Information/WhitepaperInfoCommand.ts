import { Markup } from "telegraf";
import { CommandsConstants } from "../../Constants/CommandsConstants";
import MessageButtonResponse from "../../Models/Response/MessageButtonResponse";

export const WhitepaperInfoCommand = () => {
    const buttons: object = Markup.inlineKeyboard([
        Markup.button.url('Rasta Whitepaper', CommandsConstants.whitepaper, false)
    ])
    let whitepaper: string = CommandsConstants.whitepaper;
    return new MessageButtonResponse(whitepaper, buttons);
}