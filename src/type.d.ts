import type { SlashCommandBuilder, CommandInteraction } from 'discord.js'

export interface ISlashCommand {
  name: string,
  guildOnly: boolean
  command: SlashCommandBuilder
  execute: (interaction: CommandInteraction) => unknown
}
