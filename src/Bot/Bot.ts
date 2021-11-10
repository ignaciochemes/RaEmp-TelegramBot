import { Telegraf } from 'telegraf';
import { HelpCommand } from '../Commands/HelpCommand';

export class TelegramBot {
    private static _instance: TelegramBot;

    private constructor() {
        this.startTelegramBot();
    }

    public static Instance(): TelegramBot {
        if (!TelegramBot._instance) TelegramBot._instance = new TelegramBot();
        return TelegramBot._instance;
    }

    async startTelegramBot() {
        const BOT = new Telegraf(`${process.env.BOT_TOKEN}`);
        BOT.help(ctx => {
            let response = HelpCommand();
            ctx.reply(`${response}`);
        })
        BOT.launch();
    }
    
}