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
exports.ChisteCommand = void 0;
const axios_1 = __importDefault(require("axios"));
class ChisteCommand {
    constructor() {
        this.commandNames = ['chiste'];
    }
    getHelpMessage(commandPrefix) {
        return `Usa ${commandPrefix}chiste para obtener un buen chiste.`;
    }
    run(parsedUserCommand) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = "https://sv443.net/jokeapi/v2/joke/Any";
            // let url = "https://geek-jokes.sameerkumar.website/api?format=json";
            yield axios_1.default
                .get(url)
                .then((response) => __awaiter(this, void 0, void 0, function* () {
                if (response.data.type === "single") {
                    return this.getTranslate(response.data.joke);
                }
                else {
                    yield this.getTranslate(response.data.setup)
                        .then((res) => __awaiter(this, void 0, void 0, function* () {
                        yield parsedUserCommand.originalMessage.reply(res);
                    }))
                        .catch((error) => console.log(error));
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield this.getTranslate(response.data.delivery)
                            .then((res) => {
                            parsedUserCommand.originalMessage.reply(res);
                        })
                            .catch((error) => console.log(error));
                    }), 3000);
                }
            }))
                .then((res) => {
                parsedUserCommand.originalMessage.reply(res);
            })
                .catch((error) => console.log(error));
        });
    }
    hasPermissionToRun(parsedUserCommand) {
        return true;
    }
    getTranslate(text) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield axios_1.default
                .get("https://translate.yandex.net/api/v1.5/tr.json/translate", {
                params: {
                    key: "trnsl.1.1.20200330T210354Z.c3ad92306196a8dc.e08712eb7f1f93faad122d86c583de1600ee7c9a",
                    text: text,
                    lang: "es"
                }
            })
                .then((res) => res.data.text[0]);
        });
    }
}
exports.ChisteCommand = ChisteCommand;
//# sourceMappingURL=chiste.js.map