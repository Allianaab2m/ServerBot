import { Bot } from "../../bot.ts";
import { InteractionTypes } from "../../deps.ts";
import log from "../utils/logger.ts";

Bot.events.interactionCreate = (_, interaction) => {
  if (!interaction.data) return;

  switch (interaction.type) {
    case InteractionTypes.ApplicationCommand:
      log.info(
        `[ApplicationCommand] ${interaction.data.name} command executed`,
      );
      Bot.commands.get(interaction.data.name!)?.execute(Bot, interaction);
      break;
  }
};
