import { Update } from 'typegram';
import { Context, Telegraf } from 'telegraf';
import { DiscordInfoCommand } from '../Commands/Information/DiscordInfoCommand';
import { HelpCommand } from '../Commands/HelpCommand';
import { WebInfoCommand } from '../Commands/Information/WebInfoCommand';
import MessageButtonResponse from "../Models/Response/MessageButtonResponse";
import { WhitepaperInfoCommand } from '../Commands/Information/WhitepaperInfoCommand';
import { BotRepoInfoCommand } from '../Commands/Information/BotRepoInfoCommand';
import { TextConstants } from '../Constants/TextConstants';
import UserService from '../Services/UserService';
import BanUserResponse from '../Models/Response/BanUserResponse';
import MuteUserResponse from '../Models/Response/MuteUserResponse';
const logger = require('fancy-log');

export class TelegramBot {
    private static _instance: TelegramBot;
    //private readonly _userService: UserService;

    constructor() {
        this.startTelegramBot();
    }

    public static Instance(): TelegramBot {
        if (!TelegramBot._instance) TelegramBot._instance = new TelegramBot();
        return TelegramBot._instance;
    }

    async startTelegramBot() {
        const bot: Telegraf<Context<Update>> = new Telegraf(`${process.env.BOT_TOKEN}`);
        
        bot.use(async (ctx, next) => {
            const start = Number(new Date());
            await next();
            let ms: number = Number(new Date()) - start;
            logger.info('Response time: %sms', ms);
        })
        bot.on('new_chat_members', async (ctx, next) => {
            ctx.reply(`${ctx.update.message.new_chat_members[0].first_name}, ${TextConstants.welcomeMessage}`)
            await next()
        })
        bot.help(async (ctx) => {
            let response = HelpCommand();
            ctx.replyWithMarkdown(response);
        });
        bot.command('ban', async (ctx) => {
            let administrators = await ctx.telegram.getChatAdministrators(ctx.chat.id);
            let response: BanUserResponse = await UserService.banUser(ctx.update.message, administrators);
            if (response.status === true) {
                ctx.telegram.kickChatMember(ctx.update.message.chat.id, ctx.update.message.reply_to_message.from.id);
            }
            ctx.reply(response.message);
        });
        bot.command('mute', async (ctx) => {
            let message = ctx.message.text.split(' ');
            let time = Number(message[1]);
            if (isNaN(time)) {
                ctx.reply(`${TextConstants.invalidTime}`);
                return;
            }
            let administrators = await ctx.telegram.getChatAdministrators(ctx.chat.id);
            let response: MuteUserResponse = await UserService.muteUser(ctx.update.message, administrators);
            if (response.status === true) {
                ctx.telegram.restrictChatMember(
                    ctx.update.message.chat.id, 
                    ctx.update.message.reply_to_message.from.id, 
                    { until_date: time, 
                        permissions: { 
                            can_send_messages: false,
                            can_send_other_messages: false,
                            can_invite_users: false,
                            can_change_info: false,
                            can_pin_messages: false,
                            can_send_media_messages: false,
                            can_send_polls: false,
                        }
                    }
                );
            }
            ctx.reply(response.message);
        });
        bot.command('ayuda', (ctx) => {
            let response = HelpCommand();
            ctx.replyWithMarkdown(response);
        });
        bot.command('web', (ctx) => {
            const  response: MessageButtonResponse = WebInfoCommand();
            ctx.reply(response.uri, response.buttons);
        });
        bot.command('discord', (ctx) => {
            const response: MessageButtonResponse = DiscordInfoCommand();
            ctx.reply(response.uri, response.buttons);
        });
        bot.command('whitepaper', (ctx) => {
            const response: MessageButtonResponse = WhitepaperInfoCommand();
            ctx.reply(response.uri, response.buttons);
        });
        bot.command('botrepo', (ctx) => {
            const response: MessageButtonResponse = BotRepoInfoCommand();
            ctx.reply(response.uri, response.buttons);
        });
        bot.launch();
    }
    
}