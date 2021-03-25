import { CommandContext } from '../models/command_context';
import { Command } from './command';
import axios from "axios";
import { MessageEmbed } from "discord.js";

export class TiempoCommand implements Command {
  commandNames = ['tiempo', 'clima'];

  getHelpMessage(commandPrefix: string): string {
    return `Use ${commandPrefix}tiempo para obtener el pronostico.`;
  }

  async run(parsedUserCommand: CommandContext): Promise<void> {
    let city = parsedUserCommand.args.join(" ");
    await axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0ce46f59c8c79704a018239066279614`
      )
      .then(({ data }) => {
        const embed = new MessageEmbed()
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
        parsedUserCommand.originalMessage.reply(
          "Vuelve a intentarlo, parece que esa ciudad no existe"
        );
      });
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }
}
