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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarWarsCommand = void 0;
const axios = require("axios");
class StarWarsCommand {
    constructor() {
        this.commandNames = ["starwars"];
    }
    getHelpMessage(commandPrefix) {
        return `Use ${commandPrefix}starwars para obtener informacion pertinente.`;
    }
    run(parsedUserCommand) {
        return __awaiter(this, void 0, void 0, function* () {
            let faction = 0;
            switch (parsedUserCommand.args.join(" ")) {
                case "Jedi":
                    faction = 0;
                    break;
                case "Lado Oscuro":
                    faction = 1;
                    break;
                case "Rebels":
                    faction = 2;
                    break;
                case "Mandolorians":
                    faction = 3;
                    break;
                case "Republica":
                    faction = 4;
                    break;
                default:
                    faction = this.getRandomInt(0, 4);
                    break;
            }
            yield axios
                .get(`http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuoteFromFaction/${faction}`)
                .then((response) => axios.get("https://translate.yandex.net/api/v1.5/tr.json/translate", {
                params: {
                    key: "trnsl.1.1.20200330T210354Z.c3ad92306196a8dc.e08712eb7f1f93faad122d86c583de1600ee7c9a",
                    text: response.data.starWarsQuote,
                    lang: "es",
                },
            }))
                .then((res) => {
                if (res.data.text[0] !== parsedUserCommand.originalMessage.content) {
                    parsedUserCommand.originalMessage.reply(res.data.text[0]);
                }
                return null;
            })
                .catch((error) => console.log(error));
        });
    }
    hasPermissionToRun(parsedUserCommand) {
        return true;
    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
exports.StarWarsCommand = StarWarsCommand;
//# sourceMappingURL=starwars.js.map