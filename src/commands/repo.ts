import { Locale, SlashCommandBuilder } from "discord.js";
import { ISlashCommand } from "../type";

const name = "repository"
const description = "Return repository link."
const mes = {
  success: {
    ja: "レポジトリへのリンク:\nhttps://github.com/Allianaab2m/ServerBot",
    en: "Here is link:\nhttps://github.com/Allianaab2m/ServerBot"
  }
}

const command: ISlashCommand = {
  name,
  guildOnly: true,
  command: new SlashCommandBuilder()
    .setName(name)
    .setDescription(description)
    .setNameLocalization("ja", "レポジトリ")
    .setDescriptionLocalization("ja", "この bot のレポジトリへのリンクを返します。プルリク大歓迎！"),
  async execute(interaction) {
    if (interaction.locale === Locale.Japanese) {
      interaction.reply({ content: mes.success.ja })
    } else {
      interaction.reply({ content: mes.success.en })
    }
  }
}

export default command
