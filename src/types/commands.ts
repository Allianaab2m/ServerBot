import { BotClient } from "../../bot.ts";
import {
  ApplicationCommandOption,
  ApplicationCommandTypes,
  Interaction,
} from "../../deps.ts";

export interface Command {
  name: string;
  description: string;
  type: ApplicationCommandTypes;
  devOnly?: boolean;
  options?: ApplicationCommandOption[];
  execute: (bot: BotClient, interacrtion: Interaction) => unknown;
}
