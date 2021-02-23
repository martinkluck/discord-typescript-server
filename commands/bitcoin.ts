import { CommandContext } from "../models/command_context";
import { Command } from "./command";
import axios from "axios";

export class BitcoinCommand implements Command {
  commandNames = ["bitcoin"];

  getHelpMessage(commandPrefix: string): string {
    return `Use ${commandPrefix}bitcoin to get a current price.`;
  }

  async run(parsedUserCommand: CommandContext): Promise<void> {
    await axios
      .get(`https://api.coindesk.com/v1/bpi/currentprice.json`)
      .then(async (response) => {
        await parsedUserCommand.originalMessage.reply(
          "U$S " + response.data.bpi.USD.rate_float.toFixed(2)
        );
      })
      .catch((error) => console.log(error));
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }
}
