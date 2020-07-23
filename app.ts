'use strict';

import 'dotenv/config';
import { Discord, Client, On, ArgsOf } from '@typeit/discord';
import { Message } from 'discord.js';
import * as Plugins from './plugins/init';
import * as config from './config/settings.json';

@Discord()
export class DiscordApp {
    private static client: Client;

    static Run() {
        this.client = new Client();
        this.client
            .login(process.env.DISCORD_TOKEN)
            .then(() => {
                Plugins.init(this.client);
            })
            .catch((err) => {
                console.log(err);
            });

        this.client.on('ready', () => {
            console.log('Ready!');
        });
    }
}

DiscordApp.Run();
