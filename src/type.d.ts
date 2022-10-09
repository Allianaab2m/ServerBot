import type { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js'

export interface ISlashCommand {
  name: string,
  guildOnly: boolean
  command: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand", "addSubcommandGroup">
  execute: (interaction: ChatInputCommandInteraction) => unknown
}
