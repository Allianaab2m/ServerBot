import { SlashCommandBuilder } from 'discord.js'
import { ISlashCommand } from '../type'

const name = 'ping'
const description = 'Ping command'

const command: ISlashCommand = {
  name,
  /* guildId: ["827355485644128306", "881924651142479892"], */
  guildOnly: true,
  command: new SlashCommandBuilder().setName(name).setDescription(description),
  async execute(interaction) {
    interaction.reply({ content: 'Ping!' })
  },
}

export default command
