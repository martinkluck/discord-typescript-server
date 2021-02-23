import { CommandContext } from "../models/command_context";
import { Command } from "./command";

export class ClearCommand implements Command {
  commandNames = ["clear"];

  getHelpMessage(commandPrefix: string): string {
    return `Use ${commandPrefix}greet to get a greeting.`;
  }

  async run(parsedUserCommand: CommandContext): Promise<void> {
    const fetched = await parsedUserCommand.originalMessage.channel.messages.fetch(
      { limit: 100 }
    );
    console.log(parsedUserCommand.args);
    if (parsedUserCommand.originalMessage.channel.type != "dm") {
      parsedUserCommand.originalMessage.channel.bulkDelete(fetched);
      parsedUserCommand.originalMessage.channel.send(`${fetched.size} mensajes eliminados.`);
      setTimeout(() => {        
        if (parsedUserCommand.originalMessage.channel.type != "dm")
          parsedUserCommand.originalMessage.channel.bulkDelete(1);
      }, 3000);
    }
  }

  hasPermissionToRun(parsedUserCommand: CommandContext): boolean {
    return true;
  }
}
