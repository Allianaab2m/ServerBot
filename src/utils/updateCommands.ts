import { Bot } from "../../bot.ts";
import { configs } from "../../configs.ts";

export const updateApplicationCommands = async () => {
  await Bot.helpers.upsertApplicationCommands(
    Bot.commands.filter((command) => !command.devOnly).array(),
  );

  await Bot.helpers.upsertApplicationCommands(
    Bot.commands.filter((command) => !!command.devOnly).array(),
    configs.devGuildId,
  );
};
