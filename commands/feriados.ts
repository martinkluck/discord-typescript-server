import { CommandContext } from '../models/command_context';
import { Command } from './command';
const axios = require("axios");
const { MessageEmbed } = require("discord.js");

export class FeriadosCommand implements Command {
  commandNames = ["feriados"];
  months = [
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
  days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  getHelpMessage(commandPrefix: string): string {
    return `Use ${commandPrefix}feriados para obtener el proximo feriado.`;
  }

  async run(parsedUserCommand: CommandContext): Promise<void> {
    const year = new Date().getFullYear();
    const getURL = (year: number) => `https://nolaborables.com.ar/api/v2/feriados/${year}`;
    await axios
      .get(getURL(year))
      .then(({ data }: any) => this.setNext(data))
      .then((result: any) => {
        const embed = new MessageEmbed()
          .setColor(0x5b802e)
          .setTitle("Próximo feriado")
          .addField("Motivo", result.motivo)
          .addField(
            "Fecha",
            `${this.dayOfWeek(result.dia, result.mes - 1, year)} ${result.dia} | ${
              this.months[result.mes - 1]
            }`
          )
          .addField("Tipo", result.tipo.toUpperCase());
        parsedUserCommand.originalMessage.channel.send(embed);
        return null;
      })
      .catch((error: Error) => {
        console.log(error);
        parsedUserCommand.originalMessage.reply(
          "Vuelve a intentarlo, parece que hubo un error al buscar."
        );
      });
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }

  dayOfWeek = (day: number, month: number, year: number) =>
    this.days[new Date(year, month, day).getDay()];

  setNext = (holidays: Array<any>) => {
    const now = new Date();
    const today = {
      day: now.getDate(),
      month: now.getMonth() + 1,
    };

    let holiday = holidays.find(
      (h) => (h.mes === today.month && h.dia > today.day) || h.mes > today.month
    );

    if (!holiday) {
      holiday = holidays[0];
    }
    return holiday;
  };
}
