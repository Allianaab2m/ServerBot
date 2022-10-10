import { Locale, SlashCommandBuilder } from "discord.js";
import { ISlashCommand } from "../type";

const name = "rename"
const description = "Rename bot name."

// TODO: Split into JSON files
const mes = {
  error: {
    inDM: {
      ja: "このコマンドはDMで実行できません。",
      en: "This command cannot execute in Direct Message channel."
    }
  },
  success: {
    ja: "bot名を「{botname}」に変更しました。",
    en: "Bot name changed to \"{botname}\"."
  }
}

const command: ISlashCommand = {
  name,
  guildOnly: true,
  command: new SlashCommandBuilder()
    .setName(name)
    .setNameLocalization("ja", "bot名変更")
    .setDescription(description)
    .setDescriptionLocalization("ja", "Botの名前を変更します。")
    .addStringOption(option => 
      option
        .setName("botname")
        .setMinLength(3).setMaxLength(32)
        .setDescription("Bot name")
        .setDescriptionLocalization("ja", "変更したいbot名を入力してください。")
        .setRequired(true)
    ),
  async execute(interaction) {
    if (interaction.guild) {
      const botName = interaction.options.getString("botname", true)
      const bot = await interaction.guild.members.fetchMe()
      bot.setNickname(botName)
      if (interaction.locale === Locale.Japanese) {
        interaction.reply({ content: mes.success.ja.replace('{botname}', botName) })
      } else {
        interaction.reply({ content: mes.success.en.replace('{botname}', botName) })
      }
    } else {
      if (interaction.locale === Locale.Japanese ) {
        interaction.reply({ content: mes.error.inDM.ja })
      } else {
        interaction.reply({ content: mes.error.inDM.en})
      }
    }
  },
}

export default command
