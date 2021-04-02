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
exports.CocktailCommand = void 0;
const axios_1 = __importDefault(require("axios"));
const discord_js_1 = require("discord.js");
class CocktailCommand {
    constructor() {
        this.commandNames = ["cocktail", "trago"];
    }
    getHelpMessage(commandPrefix) {
        return `Use ${commandPrefix}${this.commandNames.join(", " + commandPrefix)} para obtener un trago.`;
    }
    run(parsedUserCommand) {
        return __awaiter(this, void 0, void 0, function* () {
            var options = {
                url: "https://the-cocktail-db.p.rapidapi.com/filter.php",
                params: { i: parsedUserCommand.args },
                headers: {
                    "x-rapidapi-key": "b51ccf1b54mshb70a0f593122802p1d73ddjsn1f0edb143246",
                    "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
                },
            };
            yield axios_1.default.request(options)
                .then(({ data }) => {
                const embed = new discord_js_1.MessageEmbed()
                    .setColor(0xff0000)
                    .setTitle(`Tiempo en ${data}`)
                    .addField("Temperatura", data);
                parsedUserCommand.originalMessage.channel.send(embed);
            })
                .catch((error) => {
                console.error(error);
                parsedUserCommand.originalMessage.reply("No se pudo encontrar ningún trago");
            });
        });
    }
    hasPermissionToRun(parsedUserCommand) {
        return true;
    }
}
exports.CocktailCommand = CocktailCommand;
//# sourceMappingURL=cocktail.js.map