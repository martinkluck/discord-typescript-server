import { CommandContext } from '../models/command_context';
import { Command } from './command';
const axios = require("axios");

export class FortunaCommand implements Command {
  commandNames = ['fortuna'];

  getHelpMessage(commandPrefix: string): string {
    return `Use ${commandPrefix}fortuna para obtener informacion.`;
  }

  async run(parsedUserCommand: CommandContext): Promise<void> {
    if (parsedUserCommand.args.join(" ") === "categories") {
      parsedUserCommand.originalMessage.channel.send(
        "Valid categories are: all, bible, computers, cookie, definitions, miscellaneous, people, platitudes, politics, science, and wisdom."
      );
      return;
    }
    let url =
      "http://yerkee.com/api/fortune/" + parsedUserCommand.args.join(" ");
    await axios
      .get(url)
      .then((response: any) => this.getTranslate(response.data.fortune))
      .then((res: string) => {
        parsedUserCommand.originalMessage.reply(res);
        return null;
      })
      .catch((error: Error) => console.log(error));
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }

  async getTranslate(text: string) {
    return await axios
      .get("https://translate.yandex.net/api/v1.5/tr.json/translate", {
        params: {
          key:
            "trnsl.1.1.20200330T210354Z.c3ad92306196a8dc.e08712eb7f1f93faad122d86c583de1600ee7c9a",
          text: text,
          lang: "es",
        },
      })
      .then((res: any) => res.data.text[0]);
  }
}
