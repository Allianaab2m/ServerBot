import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import { SubCommandPluginCommand, SubCommandPluginCommandOptions } from '@sapphire/plugin-subcommands';
import { Message, MessageEmbed } from 'discord.js';
import { shuffle } from '../lib/utils';

@ApplyOptions<SubCommandPluginCommandOptions>({
	description: 'ボイスチャットにいるメンバーをチームに分けます。',
	preconditions: ['isInVoiceChannel']
})
export class UserCommand extends SubCommandPluginCommand {
	public async messageRun(message: Message, args: Args) {
		const teamSize = await args.pick('number').catch(() => 2);
		const members = message.member?.voice.channel?.members.filter((m) => !m.user.bot).map((m) => m.displayName);
		if (members == undefined) {
			return message.reply('VCにメンバーがいません。');
        } else if (members.length < teamSize) {
            return message.reply(`${teamSize}人以上のメンバーが必要です。`);
        }
		const shuffledMembers = shuffle<string>(members);
		const teamMembersArray: string[][] = [];
		for (let i = 0; i < teamSize; i++) {
			teamMembersArray.push(new Array<string>());
		}

		shuffledMembers.forEach((member, index) => {
			const team = index % teamSize;
			teamMembersArray[team].push(member);
		});
        const embed = new MessageEmbed()
        embed.setTitle("チーム分け完了")
        teamMembersArray.forEach((team, index) => {
            embed.addField(`チーム${index + 1}`, team.join(", "))
        })
        return message.reply({embeds: [embed]});
	}
}
