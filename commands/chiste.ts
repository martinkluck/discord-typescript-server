import axios from 'axios';
import { CommandContext } from '../models/command_context';
import { Command } from './command';

export class ChisteCommand implements Command {
  commandNames = ['chiste'];

  getHelpMessage(commandPrefix: string): string {
    return `Usa ${commandPrefix}chiste para obtener un buen chiste.`;
  }

  async run(parsedUserCommand: CommandContext): Promise<void> {
    let url = "https://sv443.net/jokeapi/v2/joke/Any";
    // let url = "https://geek-jokes.sameerkumar.website/api?format=json";
    await axios
      .get(url)
      .then(
        async (response: any) => {
          if (response.data.type === "single") {
            return this.getTranslate(response.data.joke);
          } else {
            await this.getTranslate(response.data.setup)
              .then(async (res) => {
                await parsedUserCommand.originalMessage.reply(res);
              })
              .catch((error) => console.log(error));
            setTimeout(async () => {
              await this.getTranslate(response.data.delivery)
                .then((res) => {
                  parsedUserCommand.originalMessage.reply(res);
                })
                .catch((error) => console.log(error));
            }, 3000);
          }
        }
      )
      .then((res: any) => {
        parsedUserCommand.originalMessage.reply(res);
      })
      .catch((error: string) => console.log(error));
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }

  async getTranslate(text: string): Promise<string> {
    return await axios
      .get("https://translate.yandex.net/api/v1.5/tr.json/translate", {
        params: {
          key:
            "trnsl.1.1.20200330T210354Z.c3ad92306196a8dc.e08712eb7f1f93faad122d86c583de1600ee7c9a",
          text: text,
          lang: "es"
        }
      })
      .then((res: any) => res.data.text[0]);
  }
}
