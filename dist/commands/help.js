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
exports.HelpCommand = void 0;
class HelpCommand {
    constructor(commands) {
        this.commandNames = ['help', 'halp', 'hlep'];
        this.commands = commands;
    }
    run(commandContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const allowedCommands = this.commands.filter((command) => command.hasPermissionToRun(commandContext));
            if (commandContext.args.length === 0) {
                // No command specified, give the user a list of all commands they can use.
                const commandNames = allowedCommands.map((command) => command.commandNames[0]);
                yield commandContext.originalMessage.reply(`here is a list of commands you can run: ${commandNames.join(', ')}. Try !help ${commandNames[0]} to learn more about one of them.`);
                return;
            }
            const matchedCommand = this.commands.find((command) => command.commandNames.includes(commandContext.args[0]));
            if (!matchedCommand) {
                yield commandContext.originalMessage.reply("I don't know about that command :(. Try !help to find all commands you can use.");
                throw Error('Unrecognized command');
            }
            if (allowedCommands.includes(matchedCommand)) {
                yield commandContext.originalMessage.reply(this.buildHelpMessageForCommand(matchedCommand, commandContext));
            }
        });
    }
    buildHelpMessageForCommand(command, context) {
        return `${command.getHelpMessage(context.commandPrefix)}\nCommand aliases: ${command.commandNames.join(', ')}`;
    }
    hasPermissionToRun(commandContext) {
        return true;
    }
    getHelpMessage(commandPrefix) {
        return 'I think you already know how to use this command...';
    }
}
exports.HelpCommand = HelpCommand;
//# sourceMappingURL=help.js.map