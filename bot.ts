import { configs } from "./configs.ts";
import {
  BotWithCache,
  BotWithHelpersPlugin,
  Collection,
  createBot,
  enableCachePlugin,
  enableCacheSweepers,
  enableHelpersPlugin,
  enablePermissionsPlugin,
} from "./deps.ts";
import { Command } from "./src/types/commands.ts";

const bot = createBot({
  token: configs.token,
  botId: configs.botId,
  intents: [],
  events: {},
});

enableHelpersPlugin(bot);
enableCachePlugin(bot);
enableCacheSweepers(bot as BotWithCache);
enablePermissionsPlugin(bot as BotWithCache);

export interface BotClient extends BotWithCache<BotWithHelpersPlugin> {
  commands: Collection<string, Command>;
}

export const Bot = bot as BotClient;
Bot.commands = new Collection();
