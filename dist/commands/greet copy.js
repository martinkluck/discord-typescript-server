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
exports.GreetCommand = void 0;
class GreetCommand {
    constructor() {
        this.commandNames = ['greet', 'hello'];
    }
    getHelpMessage(commandPrefix) {
        return `Use ${commandPrefix}greet to get a greeting.`;
    }
    run(parsedUserCommand) {
        return __awaiter(this, void 0, void 0, function* () {
            yield parsedUserCommand.originalMessage.reply('hello, world!');
        });
    }
    hasPermissionToRun(parsedUserCommand) {
        return true;
    }
}
exports.GreetCommand = GreetCommand;
//# sourceMappingURL=greet%20copy.js.map