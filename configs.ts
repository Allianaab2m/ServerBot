import { dotEnvConfig } from "./deps.ts";

const env = dotEnvConfig({ export: true });
const token = env.DISCORD_TOKEN || "";

export interface Config {
  token: string;
  botId: bigint;
}

export const configs = {
  token,
  botId: BigInt(atob(token.split(".")[0])),
  devGuildId: BigInt(env.GUILD_ID),
};
