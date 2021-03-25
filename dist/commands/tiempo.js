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
exports.TiempoCommand = void 0;
const axios_1 = __importDefault(require("axios"));
const discord_js_1 = require("discord.js");
class TiempoCommand {
    constructor() {
        this.commandNames = ['tiempo', 'clima'];
    }
    getHelpMessage(commandPrefix) {
        return `Use ${commandPrefix}tiempo para obtener el pronostico.`;
    }
    run(parsedUserCommand) {
        return __awaiter(this, void 0, void 0, function* () {
            let city = parsedUserCommand.args.join(" ");
            yield axios_1.default
                .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0ce46f59c8c79704a018239066279614`)
                .then(({ data }) => {
                const embed = new discord_js_1.MessageEmbed()
                    .setColor(0xff0000)
                    .setTitle(`Tiempo en ${data.name}`)
                    .addField("Temperatura", data.main.temp + "°")
                    .addField("RealFeel", data.main.feels_like + "°")
                    .addField("Min", data.main.temp_min + "°")
                    .addField("Max", data.main.temp_max + "°")
                    .addField("Presión", data.main.pressure + " hPa")
                    .addField("Humedad", data.main.humidity + "%");
                parsedUserCommand.originalMessage.channel.send(embed);
            })
                .catch((error) => {
                parsedUserCommand.originalMessage.reply("Vuelve a intentarlo, parece que esa ciudad no existe");
            });
        });
    }
    hasPermissionToRun(parsedUserCommand) {
        return true;
    }
}
exports.TiempoCommand = TiempoCommand;
//# sourceMappingURL=tiempo.js.map