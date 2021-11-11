import { Telegraf } from 'telegraf';
import { DiscordInfoCommand } from '../Commands/Information/DiscordInfoCommand';
import { HelpCommand } from '../Commands/HelpCommand';
import { WebInfoCommand } from '../Commands/Information/WebInfoCommand';
import MessageButtonResponse from "../Models/Response/MessageButtonResponse";
import { WhitepaperInfoCommand } from '../Commands/Information/WhitepaperInfoCommand';
import { BotRepoInfoCommand } from '../Commands/Information/BotRepoInfoCommand';

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
        BOT.use(async(ctx, next) => {
            const start = Number(new Date());
            await next();
            let ms: number = Number(new Date()) - start;
            console.info('Response time: %sms', ms);
        })
        BOT.help(ctx => {
            let response = HelpCommand();
            ctx.replyWithMarkdown(response);
        });
        BOT.command('ayuda', (ctx) => {
            let response = HelpCommand();
            ctx.replyWithMarkdown(response);
        });
        BOT.command('web', (ctx) => {
            const  response: MessageButtonResponse = WebInfoCommand();
            ctx.reply(response.uri, response.buttons);
        });
        BOT.command('discord', (ctx) => {
            const response: MessageButtonResponse = DiscordInfoCommand();
            ctx.reply(response.uri, response.buttons);
        });
        BOT.command('whitepaper', (ctx) => {
            const response: MessageButtonResponse = WhitepaperInfoCommand();
            ctx.reply(response.uri, response.buttons);
        });
        BOT.command('botrepo', (ctx) => {
            const response: MessageButtonResponse = BotRepoInfoCommand();
            ctx.reply(response.uri, response.buttons);
        });
        BOT.launch();
    }
    
}