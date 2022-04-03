import { BotClient } from "../../bot.ts";
import {
  ApplicationCommandOption,
  ApplicationCommandTypes,
  Interaction,
  Message,
} from "../../deps.ts";

export interface ExecuteFunctionParameter {
  interaction?: Interaction;
  messageCommand?: string;
  messageArgs?: string[];
}
export interface Command {
  /** The name of this command. */
  name: string;
  /** What does this command do? */
  description: string;
  /** The type of command this is. */
  type: ApplicationCommandTypes;
  /** Whether or not this command is for the dev server only. */
  devOnly?: boolean;
  /** The options for this command */
  options?: ApplicationCommandOption[];
  /** This will be executed when the command is run. */
  executeInteraction: (bot: BotClient, interaction: Interaction) => unknown;
  /** Legacy Message Command */
  executeMessage: (
    bot: BotClient,
    message: Message,
    args?: string[],
  ) => unknown;
}
