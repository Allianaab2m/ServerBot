import { Precondition } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class UserPrecondition extends Precondition {
	public run(message: Message) {
		if (!message.member) {
			return this.error();
		} else if (message.member.voice.channel == null) {
			return this.error({ message: 'VCに接続してください。' });
		} else {
			return this.ok();
		}
	}
}

declare module '@sapphire/framework' {
	interface Preconditions {
		isInVoiceChannel: never;
	}
}
