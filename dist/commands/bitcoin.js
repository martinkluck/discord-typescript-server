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
exports.BitcoinCommand = void 0;
const axios_1 = __importDefault(require("axios"));
class BitcoinCommand {
    constructor() {
        this.commandNames = ["bitcoin"];
    }
    getHelpMessage(commandPrefix) {
        return `Use ${commandPrefix}bitcoin to get a current price.`;
    }
    run(parsedUserCommand) {
        return __awaiter(this, void 0, void 0, function* () {
            yield axios_1.default
                .get(`https://api.coindesk.com/v1/bpi/currentprice.json`)
                .then((response) => __awaiter(this, void 0, void 0, function* () {
                yield parsedUserCommand.originalMessage.reply("U$S " + response.data.bpi.USD.rate_float.toFixed(2));
            }))
                .catch((error) => console.log(error));
        });
    }
    hasPermissionToRun(parsedUserCommand) {
        return true;
    }
}
exports.BitcoinCommand = BitcoinCommand;
//# sourceMappingURL=bitcoin.js.map