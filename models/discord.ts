import { CommandHandler } from './command_handler';
import { Client, Message } from "discord.js";

class Discord {
  private bot: Client;
  private bot_token: string;
  private commandHandler: CommandHandler;

  constructor() {
    this.bot = new Client();
    this.commandHandler = new CommandHandler(process.env.PREFIX || "+");
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
    this.bot.on("message", (message: Message) => {
      this.commandHandler.handleMessage(message);
    });
  }

  errors() {
    this.bot.on("error", (e) => {
      console.error("Discord client error!", e);
    });
  }
}

export default Discord;
