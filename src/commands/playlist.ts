import { Locale, SlashCommandBuilder } from "discord.js";
import { ISlashCommand } from "../type";

const name = "playlist"
const description = "Return playlist URL"
const playlistURL = "https://open.spotify.com/playlist/3kW8gvgBWD9iecoLoUFlF1?si=FTDMRVBWRCKoPyafOz_g9Q"
const mes = {
  success: {
    ja: `サーバープレイリストへのリンク:\n${playlistURL}`,
    en: `Here is url:\n${playlistURL}`
  }
}

const command: ISlashCommand = {
  name,
  guildOnly: true,
  command: new SlashCommandBuilder()
    .setName(name)
    .setNameLocalization("ja", "プレイリスト")
    .setDescription(description)
    .setDescriptionLocalization("ja", "サーバープレイリストのリンクを返します。"),
  async execute(interaction){
    if (interaction.locale === Locale.Japanese) {
      interaction.reply({
        content: mes.success.ja,
        ephemeral: true
      })
    } else {
      interaction.reply({
        content: mes.success.en,
        ephemeral: true
      })
    }
  }
}

export default command
