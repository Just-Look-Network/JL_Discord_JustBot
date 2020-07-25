import { Command, AkairoClient } from 'discord-akairo';
import { Message, MessageEmbed, Guild } from 'discord.js';
import { invalid } from 'moment';

export default class ServerInfo extends Command {
    public constructor() {
        super('serverinfo', {
            aliases: ['serverinfo', 'sv'],
            category: 'Server Commands',
            description: {
                content: 'Get Information about thes Discord Server',
                usage: 'info',
                examples: ['info']
            },
            ratelimit: 3
        });
    }

    private getFeatures(features: string[]): string {
        if (features.length > 0) {
            features.forEach((item, index, arr) => {
                arr[index] = arr[index].replace(item, `✅ ${item}`);
            });
        } else {
            features = ['none'];
        }

        return features.join('\n');
    }

    private getPrefixes(): string {
        const prefixes = this.client.commandHandler.prefix;

        if (Array.isArray(prefixes)) {
            return prefixes.join('\n');
        } else {
            return prefixes as string;
        }
    }

    private getTextChannel(): number {
        return this.client.channels.cache.filter((x) => x.type === 'text').size;
    }

    private getVoiceChannel(): number {
        return this.client.channels.cache.filter((x) => x.type === 'voice').size;
    }

    private getInfo(guild: Guild): string {
        const vl = guild.verificationLevel.toLocaleLowerCase();
        const region = guild.region.toLocaleLowerCase();
        let scan;

        if (guild.explicitContentFilter.toLocaleLowerCase() != 'disabled') {
            scan = '✅';
        } else {
            scan = '❌';
        }

        return `Verification Level: ${vl}\nServer Region: ${region}\nImage Scanning: ${scan}`;
    }

    private getBotStatus(): string {
        const ping = this.client.ws.ping;
        const version = process.env.npm_package_version;
        const premium = '❌'; // TODO: setup premium service Kappa. see the money rain incomming

        return `Version: ${version}\nPing: ${ping}ms\nPremium: ${premium}`;
    }

    private getMembers(members: any): string {
        const online = members.filter((x) => x.user.bot === false && x.user.presence.status === 'online').size;
        const idle = members.filter((x) => x.user.bot === false && x.user.presence.status === 'idle').size;
        const dnd = members.filter((x) => x.user.bot === false && x.user.presence.status === 'dnd').size;
        const offline = members.filter((x) => x.user.bot === false && x.user.presence.status === 'offline').size;

        const total = members.size;
        const humans = members.filter((x) => x.user.bot === false).size;
        const bots = members.filter((x) => x.user.bot === true).size;

        return `🟢${online} 🟡${idle} 🔴${dnd} ⚫${offline}\nTotal: ${total}\nHumans: ${humans}\nBots: ${bots}`;
    }

    public exec(message: Message): Promise<Message> {
        const Guild = message.guild;

        const info = this.getInfo(Guild);
        const botStatus = this.getBotStatus();
        const prefixes = this.getPrefixes();
        const textChannelCount = this.getTextChannel();
        const voiceChannelCount = this.getVoiceChannel();
        const features = this.getFeatures(Guild.features);
        const members = this.getMembers(Guild.members.cache);
        const roles = Guild.roles.cache.size;

        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(Guild.name)
            .setTitle('Server-Information')
            .setThumbnail(Guild.iconURL())
            .addFields(
                { name: '\u200B', value: '\u200B' },
                { name: 'Owner', value: Guild.owner, inline: true },
                {
                    name: 'Boost',
                    value: `Level: ${Guild.premiumTier}\n${Guild.premiumSubscriptionCount} / 30`,
                    inline: true
                },
                { name: 'Features', value: features, inline: true },
                { name: 'Prefixes', value: prefixes, inline: true },
                { name: 'Channels', value: `Text: ${textChannelCount}\nVoice: ${voiceChannelCount}`, inline: true },
                { name: 'Info', value: info, inline: true },
                { name: 'Bot Status', value: botStatus, inline: true },
                { name: 'Members', value: members, inline: true },
                { name: 'Roles', value: `${roles} roles`, inline: true },
                { name: '\u200B', value: '\u200B' }
            )
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.avatarURL());

        return message.util.send(embed);
    }
}
