import { CommandContext } from '../models/command_context';
import { Command } from './command';

export class HelpCommand implements Command {
  readonly commandNames = ['help'];

  private commands: Command[];

  constructor(commands: Command[]) {
    this.commands = commands;
  }

  async run(commandContext: CommandContext): Promise<void> {
    const allowedCommands = this.commands.filter((command) =>
      command.hasPermissionToRun(commandContext),
    );

    if (commandContext.args.length === 0) {
      // No command specified, give the user a list of all commands they can use.
      const commandNames = allowedCommands.map(
        (command) => command.commandNames[0],
      );
      await commandContext.originalMessage.reply(
        `acá una lista de los comando que puedes utilizar: ${commandNames.join(
          ", "
        )}. Prueba ${process.env.PREFIX || "+"}help ${
          commandNames[0]
        } para saber mas sobre el comando.`
      );
    }

    const matchedCommand = this.commands.find((command) =>
      command.commandNames.includes(commandContext.args[0]),
    );
    if (!matchedCommand) {
      await commandContext.originalMessage.reply(
        `No conozco ese comando, utiliza ${process.env.PREFIX || '+'}help para conocer los comandos disponibles.`,
      );
      throw Error('Unrecognized command');
    }
    if (allowedCommands.includes(matchedCommand)) {
      await commandContext.originalMessage.reply(
        this.buildHelpMessageForCommand(matchedCommand, commandContext),
      );
    }
  }

  private buildHelpMessageForCommand(
    command: Command,
    context: CommandContext,
  ): string {
    return `${command.getHelpMessage(
      context.commandPrefix,
    )}\nCommand aliases: ${command.commandNames.join(', ')}`;
  }

  hasPermissionToRun(commandContext: CommandContext): boolean {
    return true;
  }

  getHelpMessage(commandPrefix: string) {
    return 'I think you already know how to use this command...';
  }
}
