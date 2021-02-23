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
exports.ClearCommand = void 0;
class ClearCommand {
    constructor() {
        this.commandNames = ["clear"];
    }
    getHelpMessage(commandPrefix) {
        return `Use ${commandPrefix}greet to get a greeting.`;
    }
    run(parsedUserCommand) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetched = yield parsedUserCommand.originalMessage.channel.messages.fetch({ limit: 100 });
            console.log(parsedUserCommand.args);
            if (parsedUserCommand.originalMessage.channel.type != "dm") {
                parsedUserCommand.originalMessage.channel.bulkDelete(fetched);
                parsedUserCommand.originalMessage.channel.send(`${fetched.size} mensajes eliminados.`);
                setTimeout(() => {
                    if (parsedUserCommand.originalMessage.channel.type != "dm")
                        parsedUserCommand.originalMessage.channel.bulkDelete(1);
                }, 3000);
            }
        });
    }
    hasPermissionToRun(parsedUserCommand) {
        return true;
    }
}
exports.ClearCommand = ClearCommand;
//# sourceMappingURL=clear.js.map