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
exports.FeriadosCommand = void 0;
const axios = require("axios");
const { MessageEmbed } = require("discord.js");
class FeriadosCommand {
    constructor() {
        this.commandNames = ["feriados"];
        this.months = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre",
        ];
        this.days = [
            "Domingo",
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sabado",
        ];
        this.dayOfWeek = (day, month, year) => this.days[new Date(year, month, day).getDay()];
        this.setNext = (holidays) => {
            const now = new Date();
            const today = {
                day: now.getDate(),
                month: now.getMonth() + 1,
            };
            let holiday = holidays.find((h) => (h.mes === today.month && h.dia > today.day) || h.mes > today.month);
            if (!holiday) {
                holiday = holidays[0];
            }
            return holiday;
        };
    }
    getHelpMessage(commandPrefix) {
        return `Use ${commandPrefix}feriados para obtener el proximo feriado.`;
    }
    run(parsedUserCommand) {
        return __awaiter(this, void 0, void 0, function* () {
            const year = new Date().getFullYear();
            const getURL = (year) => `https://nolaborables.com.ar/api/v2/feriados/${year}`;
            yield axios
                .get(getURL(year))
                .then(({ data }) => this.setNext(data))
                .then((result) => {
                const embed = new MessageEmbed()
                    .setColor(0x5b802e)
                    .setTitle("Próximo feriado")
                    .addField("Motivo", result.motivo)
                    .addField("Fecha", `${this.dayOfWeek(result.dia, result.mes - 1, year)} ${result.dia} | ${this.months[result.mes - 1]}`)
                    .addField("Tipo", result.tipo.toUpperCase());
                parsedUserCommand.originalMessage.channel.send(embed);
                return null;
            })
                .catch((error) => {
                console.log(error);
                parsedUserCommand.originalMessage.reply("Vuelve a intentarlo, parece que hubo un error al buscar.");
            });
        });
    }
    hasPermissionToRun(parsedUserCommand) {
        return true;
    }
}
exports.FeriadosCommand = FeriadosCommand;
//# sourceMappingURL=feriados.js.map