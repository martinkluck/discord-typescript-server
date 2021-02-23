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
exports.FortunaCommand = void 0;
const axios = require("axios");
class FortunaCommand {
    constructor() {
        this.commandNames = ['fortuna'];
    }
    getHelpMessage(commandPrefix) {
        return `Use ${commandPrefix}fortuna para obtener informacion.`;
    }
    run(parsedUserCommand) {
        return __awaiter(this, void 0, void 0, function* () {
            if (parsedUserCommand.args.join(" ") === "categories") {
                parsedUserCommand.originalMessage.channel.send("Valid categories are: all, bible, computers, cookie, definitions, miscellaneous, people, platitudes, politics, science, and wisdom.");
                return;
            }
            let url = "http://yerkee.com/api/fortune/" + parsedUserCommand.args.join(" ");
            yield axios
                .get(url)
                .then((response) => this.getTranslate(response.data.fortune))
                .then((res) => {
                parsedUserCommand.originalMessage.reply(res);
                return null;
            })
                .catch((error) => console.log(error));
        });
    }
    hasPermissionToRun(parsedUserCommand) {
        return true;
    }
    getTranslate(text) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield axios
                .get("https://translate.yandex.net/api/v1.5/tr.json/translate", {
                params: {
                    key: "trnsl.1.1.20200330T210354Z.c3ad92306196a8dc.e08712eb7f1f93faad122d86c583de1600ee7c9a",
                    text: text,
                    lang: "es",
                },
            })
                .then((res) => res.data.text[0]);
        });
    }
}
exports.FortunaCommand = FortunaCommand;
//# sourceMappingURL=fortuna.js.map