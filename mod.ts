import { startBot } from "./deps.ts";
import log from "./src/utils/logger.ts";
import { fileLoader, importDirectory } from "./src/utils/loader.ts";
import { updateApplicationCommands } from "./src/utils/updateCommands.ts";

import { Bot } from "./bot.ts";

log.info("Starting Bot...");

await Promise.all(
  [
    "./src/commands",
    "./src/events",
  ].map((path) => importDirectory(Deno.realPathSync(path))),
);

await fileLoader();

await updateApplicationCommands();

await startBot(Bot);
