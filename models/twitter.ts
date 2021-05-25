import { Tweet } from './../types/tweet.interface';
import { MessageEmbed, TextChannel } from "discord.js";
import Twitter from "twit";
import DataBase from "./prisma";
class ApiTwitter {
  private client: Twitter;

  constructor() {
    this.client = new Twitter({
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

  async streamTweets(channel: TextChannel) {
    const connection = new DataBase();
    try {
      const twitter_accounts = await connection
        .getConnection()
        .tweetNotifications.findMany();
      const ta = twitter_accounts.map((account) => account.twitter_id.toString());

      let stream = this.client.stream("statuses/filter", {
        follow: ta.join(','),
      });
      stream.on("tweet", (tweet: Tweet) => {
        if (ta.includes(tweet.user.id.toString())) {
          const embed = new MessageEmbed();
          embed.setAuthor(tweet.user.name, tweet.user.profile_image_url_https);
          embed.setDescription(tweet.text);
          channel.send(embed);
        }
      });

      stream.on("error", function (error: any) {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    } finally {
      connection.release();
    }
  }
}

export default ApiTwitter;
