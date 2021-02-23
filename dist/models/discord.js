"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_handler_1 = require("./command_handler");
const discord_js_1 = require("discord.js");
class Discord {
    constructor() {
        this.bot = new discord_js_1.Client();
        this.commandHandler = new command_handler_1.CommandHandler(process.env.PREFIX || "+");
        //   this.bot.commands = new Collection();
        this.bot_token = process.env.TOKEN || "";
        // Listening Messages
        this.messages();
        // Listening Errors
        this.errors();
        // Login
        this.login();
    }
    login() {
        this.bot.login(this.bot_token);
        this.bot.on("ready", () => {
            if (this.bot && this.bot.user) {
                console.info(`Logged in as ${this.bot.user.tag}!`);
            }
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
}
exports.default = Discord;
//# sourceMappingURL=discord.js.map