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
exports.CommandHandler = void 0;
const chiste_1 = require("./../commands/chiste");
const bitcoin_1 = require("./../commands/bitcoin");
const greet_1 = require("../commands/greet");
const help_1 = require("../commands/help");
const command_context_1 = require("./command_context");
const reactor_1 = require("../reactions/reactor");
const clear_1 = require("../commands/clear");
const feriados_1 = require("../commands/feriados");
const fortuna_1 = require("../commands/fortuna");
const tiempo_1 = require("../commands/tiempo");
/** Handler for bot commands issued by users. */
class CommandHandler {
    constructor(prefix) {
        const commandClasses = [
            // TODO: Add more commands here.
            greet_1.GreetCommand,
            bitcoin_1.BitcoinCommand,
            chiste_1.ChisteCommand,
            clear_1.ClearCommand,
            feriados_1.FeriadosCommand,
            fortuna_1.FortunaCommand,
            // StarWarsCommand,
            tiempo_1.TiempoCommand,
        ];
        this.commands = commandClasses.map((CommandClass) => new CommandClass());
        this.commands.push(new help_1.HelpCommand(this.commands));
        this.prefix = prefix;
    }
    /** Executes user commands contained in a message if appropriate. */
    handleMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            if (message.author.bot || !this.isCommand(message)) {
                return;
            }
            const commandContext = new command_context_1.CommandContext(message, this.prefix);
            const allowedCommands = this.commands.filter((command) => command.hasPermissionToRun(commandContext));
            const matchedCommand = this.commands.find((command) => command.commandNames.includes(commandContext.parsedCommandName));
            if (!matchedCommand) {
                yield message.reply("I don't recognize that command. Try !help.");
                yield reactor_1.reactor.failure(message);
            }
            else if (!allowedCommands.includes(matchedCommand)) {
                yield message.reply("you aren't allowed to use that command. Try !help.");
                yield reactor_1.reactor.failure(message);
            }
            else {
                yield matchedCommand
                    .run(commandContext)
                    .then(() => {
                    reactor_1.reactor.success(message);
                })
                    .catch((reason) => {
                    reactor_1.reactor.failure(message);
                });
            }
        });
    }
    /** Determines whether or not a message is a user command. */
    isCommand(message) {
        return message.content.startsWith(this.prefix);
    }
}
exports.CommandHandler = CommandHandler;
//# sourceMappingURL=command_handler.js.map