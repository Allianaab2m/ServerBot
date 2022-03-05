import { ApplyOptions } from '@sapphire/decorators';
import { Listener, ListenerOptions } from '@sapphire/framework';
import {MessageEmbed, VoiceState} from 'discord.js';

@ApplyOptions<ListenerOptions>({
	event: 'voiceStateUpdate'
})
export class UserEvent extends Listener {
  public async run(oldState: VoiceState, newState: VoiceState) {
	  const embed = new MessageEmbed()
	  let state: VoiceState
	  let flag: 'in' | 'out'
	  if (oldState.channel === null && newState.channel !== null){
		  state = newState
		  flag = 'in'
	  } else if (oldState.channel !== null && newState.channel === null){
		  state = oldState
		  flag = 'out'
	  } else {
		  return
	  }

	  const vcChannelName = state.channel?.name.toLowerCase()
	  const chatOnlyChannel = state.guild.channels.cache.find(channel => channel.name === vcChannelName + '-chatonly')
	  if (chatOnlyChannel?.isText()){
		  embed.setTitle(`${state.member?.nickname}さんが${flag === 'in' ? '入室' : '退室'}しました`)
		  const sendMessage = await chatOnlyChannel.send({'embeds': [embed]})
		  setTimeout(() => {
			  sendMessage.delete()
		  }, 30000)
	  }
  }
}
