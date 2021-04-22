import { MessageEmbed, TextChannel } from "discord.js";
import Twitter from "twit";

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

  streamTweets(channel: TextChannel) {
    let stream = this.client.stream("statuses/filter", {
      follow: process.env.TWITTER_USER_ID,
    });
    stream.on("tweet", (tweet) => {
      if(parseInt(process.env.TWITTER_USER_ID || "") === tweet.user.id) {
        const embed = new MessageEmbed();
        embed.setAuthor(tweet.user.name, tweet.user.profile_image_url_https);
        embed.setDescription(tweet.text);
        channel.send(embed);
      }
    });

    stream.on("error", function (error: any) {
      console.log(error);
    });
  }
}

export default ApiTwitter;
