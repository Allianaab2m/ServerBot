import { Locale, SlashCommandBuilder } from "discord.js";
import { ISlashCommand } from "../type";
import * as dotenv from 'dotenv'
import SpotifyWebApi from "spotify-web-api-node"

dotenv.config()

const name = "music_gacha"
const description = "Music gacha"
const pickCount = 5
const playlistURL = "3kW8gvgBWD9iecoLoUFlF1"

// TODO: Split into JSON files
const mes = {
  inDM: {
    ja: "このコマンドはDMで実行できません。",
    en: "This command cannot execute in Direct Message channel."
  },
  success: {
    ja: `曲${pickCount}連ガチャの結果:`,
    en: "Result of music gacha:"
  }
}

const randArray = <T> (targetArray: T[], num: number): T[] => {
  const retArray: T[] = []
  while(retArray.length < num && targetArray.length > 0) {
    const randIndex = Math.floor(Math.random() * targetArray.length)
    retArray.push(targetArray[randIndex])
    targetArray.splice(randIndex, 1)
  }
  return retArray
}

const command: ISlashCommand = {
  name,
  guildOnly: true,
  command: new SlashCommandBuilder()
    .setName(name)
    .setNameLocalization("ja", "音楽ガチャ")
    .setDescription(description)
    .setDescriptionLocalization("ja", `サーバープレイリストからランダムに${pickCount}曲取り出して紹介します。`),
  async execute(interaction) {
    if (interaction.inGuild()) {
      const swa = new SpotifyWebApi({
        clientId: process.env.SPOTIFY_CLIENTID,
        clientSecret: process.env.SPOTIFY_CLIENTSECRET
      })
      await swa.clientCredentialsGrant().then((data) => {
        swa.setAccessToken(data.body['access_token'])
      })
      const res = await swa.getPlaylistTracks(playlistURL, { limit: 100 })
      const offset = Math.floor(Math.random() * (res.body.total - 100))
      const limitedRes = await swa.getPlaylistTracks(playlistURL, { limit: 100, offset: offset })
      const selectedItems = randArray(limitedRes.body.items, pickCount)

      const musicTitles = selectedItems.map(i => { 
        if (i.track!.artists.length > 1) {
          return `${i.track!.name} - ${i.track?.artists[0].name} etc...\n${i.track!.external_urls.spotify}`
        } else {
          return `${i.track!.name} - ${i.track?.artists[0].name}\n${i.track!.external_urls.spotify}`
        }
      })
      if (interaction.locale === Locale.Japanese) {
        interaction.reply({ content: mes.success.ja + "\n" + musicTitles.join('\n')})
      } else {
        interaction.reply({ content: mes.success.en + "\n" + musicTitles.join('\n')})
      }
    } else {
      if (interaction.locale === Locale.Japanese) {
        interaction.reply({ content: mes.inDM.ja })
      } else {
        interaction.reply({ content: mes.inDM.en })
      }
    }
  }
}

export default command
