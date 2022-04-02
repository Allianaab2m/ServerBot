import {
  ApplicationCommandTypes,
  InteractionResponseTypes,
} from "../../deps.ts";
import { createCommand } from "./mod.ts";

createCommand({
  name: "ping",
  description: "ping the bot",
  type: ApplicationCommandTypes.ChatInput,
  execute: async (Bot, interaction) => {
    await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: "Pong!",
        },
      },
    );
  },
});
