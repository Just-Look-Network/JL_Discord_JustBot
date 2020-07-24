import { Listener } from 'discord-akairo';
import Logger from '../../utils/logger';

export default class ReadyListener extends Listener {
    public constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready',
            category: 'client'
        });
    }

    public exec(): void {
        Logger.info(`${this.client.user.tag} is now online and Ready!`);
    }
}
