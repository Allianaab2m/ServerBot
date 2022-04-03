import { Bot } from '../../bot.ts'
import { MessageTypes } from "../../deps.ts"
import log from '../utils/logger.ts'

Bot.events.reactionAdd = async (_, reaction) => {
	if (reaction.guildId === undefined) return
	const guild = await Bot.helpers.getGuild(reaction.guildId)
	const channel = await Bot.helpers.getChannel(reaction.channelId)
	const message = await Bot.helpers.getMessage(reaction.channelId, reaction.messageId)
	if (message.type !== MessageTypes.Default) return
	if (reaction.emoji.name === '📌') {
		log.info(
			`[Pin Add] ${guild.name}/#${channel.name} ${message.content}`
		)
		await Bot.helpers.pinMessage(reaction.channelId, reaction.messageId)
	}
}

