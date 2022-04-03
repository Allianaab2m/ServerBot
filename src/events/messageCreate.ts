import { Bot } from "../../bot.ts";
import { MessageTypes } from "../../deps.ts";
import { configs } from "../../configs.ts";
import log from "../utils/logger.ts";

Bot.events.messageCreate = async (_, message) => {
  // Delete Pin message
  if (message.type === MessageTypes.ChannelPinnedMessage) {
    await Bot.helpers.deleteMessage(message.channelId, message.id);
    log.info(`[Pin Message Delete] ${message.channelId}/${message.id}`);
  }

  // Legacy Message Content Command Handler
  if (
    message.type === MessageTypes.Default &&
    message.content.startsWith(configs.prefix) && !message.isBot
  ) {
    const [command, ...args] = message.content.slice(configs.prefix.length)
      .split(" ");
    log.info(
      `[Legacy Message Command] ${command}`,
    );
    Bot.commands.get(command)?.executeMessage(Bot, message, args);
  }
};
