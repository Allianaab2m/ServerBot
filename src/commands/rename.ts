import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import { SubCommandPluginCommand, SubCommandPluginCommandOptions } from '@sapphire/plugin-subcommands';
import type { Message } from 'discord.js';

@ApplyOptions<SubCommandPluginCommandOptions>({
	description: 'botの名前を変更します。',
	options: ['name']
})
export class UserCommand extends SubCommandPluginCommand {
	public async messageRun(message: Message, args: Args) {
		const oldName = message.guild?.me?.displayName;
		const newName = args.getOption('name');
		if (newName == null) {
			return message.reply('botの名前が指定されていません。\n`ab.rename --name=[新しい名前]`と入力してください。');
		} else if (newName.length >= 27) {
			return message.reply('botの名前は27文字以内にしてください。');
		}
		return message.reply(`botの名前を${oldName}から${newName}に変更しました。`);
	}
}
