import { Telegraf } from 'telegraf';
import { WelcomeMessage } from '../Commands/HelpCommand';
import { CommandsConstants } from '../Constants/CommandsConstants';

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
            const response = WelcomeMessage();
            ctx.reply(`${response}`);
        });
        BOT.command('web', (ctx) => {
            ctx.reply(CommandsConstants.officialWeb);
        });
        BOT.command('discord', (ctx) => {
            ctx.reply(CommandsConstants.discord);
        });
        BOT.command('whitepaper', (ctx) => {
            ctx.reply(CommandsConstants.whitepaper);
        });
        BOT.launch();
    }
    
}