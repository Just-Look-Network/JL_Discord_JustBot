import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class PingCommand extends Command {
    public constructor() {
        super('error', {
            aliases: ['error'],
            category: 'Basic Commands',
            description: {
                content: 'Check the latency of the ping to the Discord API',
                usage: 'error',
                examples: ['error']
            },
            ratelimit: 3
        });
    }

    public exec(message: Message): Promise<Message> {
        throw new Error();
    }
}
