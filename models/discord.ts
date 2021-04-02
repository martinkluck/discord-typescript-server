import { Heroku } from "./../types/heroku.interfase";
import { CommandHandler } from "./command_handler";
import {
  Client,
  Message,
  Channel,
  MessageEmbed,
  TextChannel,
} from "discord.js";
import Bot from "slackbots";
import Twitter from "./twitter";

class Discord {
  private bot: Client;
  private bot_token: string;
  private commandHandler: CommandHandler;
  private slack_client: any;
  private discordChannel: string;
  private twitter: Twitter;

  constructor() {
    this.bot = new Client();
    this.commandHandler = new CommandHandler(process.env.PREFIX || "+");
    this.discordChannel = process.env.DISCORD_CHANNEL || "prueba-bot";
    this.bot_token = process.env.TOKEN || "";

    if (process.env.SLACK_TOKEN) {
      this.slackLogin();
      //Slack
      this.discordSlackMessages();
    }
    // Twitter
    this.twitter = new Twitter();
    // Listening Messages
    this.messages();
    // Listening Errors
    this.errors();
    // Login
    this.login();
  }

  login() {
    this.bot.login(this.bot_token);

    this.bot.on("ready", async () => {
      if (this.bot && this.bot.user) {
        console.info(`Logged in as ${this.bot.user.tag}!`);

        let channel = (await this.bot.channels.cache.find(
          (channel) => channel.id === "812743852875579392"
        )) as TextChannel;
        this.twitter.streamTweets(channel);
      }
    });
  }

  slackLogin() {
    this.slack_client = new Bot({
      token: process.env.SLACK_TOKEN,
      name: "discord-connector",
    });

    this.slack_client.on("start", function () {
      console.log("Slack connected");
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

  discordSlackMessages() {
    //Redirect Discord messages to Slack
    this.bot.on("message", (message: Message) => {
      //Check if message is from the discord channel configured above
      //(Thanks athyk)
      if (
        message.channel.type === "text" &&
        message.channel.id !== this.discordChannel
      ) {
        return;
      }
      //Avoiding re-sending a message we just received from Slack
      //(event gets triggered even if it's a msg *we* sent to the chat)
      if (message.author.username != this.bot.user?.username) {
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
          this.slack_client.postMessageToGroup(
            process.env.SLACK_CHANNEL,
            message.author.username + ": " + content
          );
        } else {
          console.log(process.env.SLACK_CHANNEL);
          this.slack_client.postMessageToChannel(
            process.env.SLACK_CHANNEL,
            message.author.username + ": " + content
          );
        }
      }
    });

    //Redirect Slack client to Discord
    this.slack_client.on("message", (message: any) => {
      if (message.type == "message") {
        //Unlike Discord, event doesn't get triggered if it is a msg we sent

        //We have to find the user name/nickname by ourselves though
        this.slack_client.getUsers()._value.members.forEach((elem: any) => {
          if (elem.id == message.user) {
            let username = elem.name;
            let realname = elem.real_name;
            console.log(
              "Slack  --> " + realname + " (" + username + ") : " + message.text
            );
            // console.log(channel);

            let channel = this.bot.channels.cache.get(
              this.discordChannel
            ) as TextChannel;
            channel.send(realname + " : " + message.text);
          }
        });
      }
    });
  }

  sendDeployMessage(response: Heroku) {
    let channel = this.bot.channels.cache.find(
      (channel) => channel.id === "694967977530884176"
    ) as TextChannel;
    let message = new MessageEmbed();
    message.setColor(0x79589F);
    message.setTitle("Nuevo deploy");    
    message.setAuthor(
      "Heroku",
      "https://c0.klipartz.com/pngpicture/855/935/gratis-png-logo-de-heroku-logo-de-heroku.png"
    );
    message.addField("App", response.data.app.name);
    message.addField("Deployer", response.actor.email);
    message.addField("Estado", response.resource + ' ' + response.data.status);
    message.addField("Hora", response.updated_at);
    channel.send(message);
  }
}

export default Discord;
