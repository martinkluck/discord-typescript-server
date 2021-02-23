import { CommandContext } from '../models/command_context';
import { Command } from './command';
const axios = require("axios");

export class StarWarsCommand implements Command {
  commandNames = ["starwars"];

  getHelpMessage(commandPrefix: string): string {
    return `Use ${commandPrefix}starwars para obtener informacion pertinente.`;
  }

  async run(parsedUserCommand: CommandContext): Promise<void> {
    let faction = 0;
    switch (parsedUserCommand.args.join(" ")) {
      case "Jedi":
        faction = 0;
        break;
      case "Lado Oscuro":
        faction = 1;
        break;
      case "Rebels":
        faction = 2;
        break;
      case "Mandolorians":
        faction = 3;
        break;
      case "Republica":
        faction = 4;
        break;

      default:
        faction = this.getRandomInt(0, 4);
        break;
    }
    await axios
      .get(
        `http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuoteFromFaction/${faction}`
      )
      .then((response: any) =>
        axios.get("https://translate.yandex.net/api/v1.5/tr.json/translate", {
          params: {
            key:
              "trnsl.1.1.20200330T210354Z.c3ad92306196a8dc.e08712eb7f1f93faad122d86c583de1600ee7c9a",
            text: response.data.starWarsQuote,
            lang: "es",
          },
        })
      )
      .then((res: any) => {
        if (res.data.text[0] !== parsedUserCommand.originalMessage.content) {
          parsedUserCommand.originalMessage.reply(res.data.text[0]);
        }
        return null;
      })
      .catch((error: Error) => console.log(error));
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
