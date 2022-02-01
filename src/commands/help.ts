import { ApplyOptions } from '@sapphire/decorators';
import type { Args } from '@sapphire/framework';
import { SubCommandPluginCommand, SubCommandPluginCommandOptions } from '@sapphire/plugin-subcommands';
import { Message, MessageEmbed } from 'discord.js';

@ApplyOptions<SubCommandPluginCommandOptions>({
	description: 'botのコマンドに関する説明を表示します。`ab.help [コマンド名]`'
})
export class UserCommand extends SubCommandPluginCommand {
    public async messageRun(message: Message, args: Args) {
        const { client } = this.container
        const commandName = await args.pick('string').catch(() => 'help')
        const command = client.stores.get('commands').filter((c) => c.name === commandName)
        const commandDescription = command.get(commandName)?.description
        if (commandDescription == undefined) {
            return
        } else {
            const embed = new MessageEmbed()
            embed.setTitle(`${commandName}の説明`)
            embed.setDescription(commandDescription)
            return message.reply({embeds: [embed]})
        }
    }
}
