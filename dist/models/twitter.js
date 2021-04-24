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
const discord_js_1 = require("discord.js");
const twit_1 = __importDefault(require("twit"));
const prisma_1 = __importDefault(require("./prisma"));
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
        return __awaiter(this, void 0, void 0, function* () {
            const connection = new prisma_1.default();
            try {
                const twitter_accounts = yield connection
                    .getConnection()
                    .tweetNotifications.findMany();
                const ta = twitter_accounts.map((account) => account.twitter_id.toString());
                let stream = this.client.stream("statuses/filter", {
                    follow: ta.join(','),
                });
                stream.on("tweet", (tweet) => {
                    if (ta.includes(tweet.user.id.toString())) {
                        const embed = new discord_js_1.MessageEmbed();
                        embed.setAuthor(tweet.user.name, tweet.user.profile_image_url_https);
                        embed.setDescription(tweet.text);
                        channel.send(embed);
                    }
                });
                stream.on("error", function (error) {
                    console.log(error);
                });
            }
            catch (error) {
                console.log(error);
            }
            finally {
                connection.release();
            }
        });
    }
}
exports.default = ApiTwitter;
//# sourceMappingURL=twitter.js.map