"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twitter_1 = __importDefault(require("twitter"));
class ApiTwitter {
    constructor() {
        this.client = new twitter_1.default({
            consumer_key: process.env.TWITTER_CONSUMER_KEY || '',
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET || '',
            access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY || '',
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || '',
        });
        this.client.get("search/tweets", { q: "node.js" }, function (error, tweets, response) {
            console.log(tweets);
        });
    }
}
//# sourceMappingURL=twitter.js.map