import {
  ApplicationCommandTypes,
  Interaction,
  InteractionResponseTypes,
  Message,
} from "../../deps.ts";
import { BotClient } from "../../bot.ts";
import { snowflakeToTimestamp } from "../utils/helpers.ts";
import { createCommand } from "./mod.ts";

createCommand({
  name: "ping",
  description: "Ping the Bot!",
  type: ApplicationCommandTypes.ChatInput,
  executeInteraction: async (Bot: BotClient, interaction: Interaction) => {
    const ping = Date.now() - snowflakeToTimestamp(interaction.id);
    return await Bot.helpers.sendInteractionResponse(
      interaction.id,
      interaction.token,
      {
        type: InteractionResponseTypes.ChannelMessageWithSource,
        data: {
          content: `🏓 Pong! ${ping}ms`,
        },
      },
    );
  },
  executeMessage: async (Bot: BotClient, message: Message) => {
    const ping = Date.now() - snowflakeToTimestamp(message.id);
    return await Bot.helpers.sendMessage(message.channelId, {
      content: `Pong! ${ping}ms`,
    });
  },
});
