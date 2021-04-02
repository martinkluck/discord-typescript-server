"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_handler_1 = require("./command_handler");
const discord_js_1 = require("discord.js");
const slackbots_1 = __importDefault(require("slackbots"));
const twitter_1 = __importDefault(require("./twitter"));
class Discord {
    constructor() {
        this.bot = new discord_js_1.Client();
        this.commandHandler = new command_handler_1.CommandHandler(process.env.PREFIX || "+");
        this.discordChannel = process.env.DISCORD_CHANNEL || "prueba-bot";
        this.bot_token = process.env.TOKEN || "";
        if (process.env.SLACK_TOKEN) {
            this.slackLogin();
            //Slack
            this.discordSlackMessages();
        }
        // Twitter
        this.twitter = new twitter_1.default();
        // Listening Messages
        this.messages();
        // Listening Errors
        this.errors();
        // Login
        this.login();
    }
    login() {
        this.bot.login(this.bot_token);
        this.bot.on("ready", () => __awaiter(this, void 0, void 0, function* () {
            if (this.bot && this.bot.user) {
                console.info(`Logged in as ${this.bot.user.tag}!`);
                let channel = (yield this.bot.channels.cache.find((channel) => channel.id === "812743852875579392"));
                this.twitter.streamTweets(channel);
            }
        }));
    }
    slackLogin() {
        this.slack_client = new slackbots_1.default({
            token: process.env.SLACK_TOKEN,
            name: "discord-connector",
        });
        this.slack_client.on("start", function () {
            console.log("Slack connected");
        });
    }
    messages() {
        this.bot.on("message", (message) => {
            this.commandHandler.handleMessage(message);
        });
    }
    errors() {
        this.bot.on("error", (e) => {
            console.error("Discord client error!", e);
        });
    }
    discordSlackMessages() {
        //Redirect Discord messages to Slack
        this.bot.on("message", (message) => {
            var _a;
            //Check if message is from the discord channel configured above
            //(Thanks athyk)
            if (message.channel.type === "text" &&
                message.channel.id !== this.discordChannel) {
                return;
            }
            //Avoiding re-sending a message we just received from Slack
            //(event gets triggered even if it's a msg *we* sent to the chat)
            if (message.author.username != ((_a = this.bot.user) === null || _a === void 0 ? void 0 : _a.username)) {
                //Check for atachements (files/images/etc.)
                var content = message.content;
                if (message.attachments != null) {
                    var attachments = message.attachments.array();
                    attachments.forEach((a) => {
                        content += "\n" + a.url;
                    });
                }
                console.log("Discord --> " + message.author.username + ": " + content);
                if (process.env.SLACK_CHANNEL_PRIVATE) {
                    this.slack_client.postMessageToGroup(process.env.SLACK_CHANNEL, message.author.username + ": " + content);
                }
                else {
                    console.log(process.env.SLACK_CHANNEL);
                    this.slack_client.postMessageToChannel(process.env.SLACK_CHANNEL, message.author.username + ": " + content);
                }
            }
        });
        //Redirect Slack client to Discord
        this.slack_client.on("message", (message) => {
            if (message.type == "message") {
                //Unlike Discord, event doesn't get triggered if it is a msg we sent
                //We have to find the user name/nickname by ourselves though
                this.slack_client.getUsers()._value.members.forEach((elem) => {
                    if (elem.id == message.user) {
                        let username = elem.name;
                        let realname = elem.real_name;
                        console.log("Slack  --> " + realname + " (" + username + ") : " + message.text);
                        // console.log(channel);
                        let channel = this.bot.channels.cache.get(this.discordChannel);
                        channel.send(realname + " : " + message.text);
                    }
                });
            }
        });
    }
}
exports.default = Discord;
//# sourceMappingURL=discord.js.map