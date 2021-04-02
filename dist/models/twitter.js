"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const twit_1 = __importDefault(require("twit"));
class ApiTwitter {
    constructor() {
        this.client = new twit_1.default({
            consumer_key: process.env.TWITTER_API_KEY || "",
            consumer_secret: process.env.TWITTER_API_SECRET_KEY || "",
            access_token: process.env.TWITTER_ACCESS_TOKEN || "",
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || "",
        });
        /* this.client.get(
              "search/tweets",
              { q: "Heroku" },
              function (error, tweets, response) {
                console.log(tweets);
              }
            ); */
        // this.client.get(
        //   "statuses/user_timeline",
        //   params,
        //   function (error, tweets, response) {
        //     if (!error) {
        //       console.log(tweets);
        //     }
        //   }
        // );
    }
    streamTweets(channel) {
        let stream = this.client.stream("statuses/filter", {
            follow: process.env.TWITTER_USER_ID,
        });
        stream.on("tweet", (tweet) => {
            const embed = new discord_js_1.MessageEmbed();
            embed.setAuthor(tweet.user.name, tweet.user.profile_image_url_https);
            embed.setDescription(tweet.text);
            channel.send(embed);
        });
        stream.on("error", function (error) {
            console.log(error);
        });
    }
}
exports.default = ApiTwitter;
//# sourceMappingURL=twitter.js.map