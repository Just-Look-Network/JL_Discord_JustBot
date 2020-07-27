import 'dotenv/config';
import { owners } from './config/settings.json';
import BotClient from './core/BotClient';
import Logger from './utils/logger';

const token: string = process.env.DISCORD_TOKEN;
const client: BotClient = new BotClient({ token, owners });

client
    .on('disconnect', () => Logger.warn('Connection lost...'))
    .on('error', (err) => Logger.error(err))
    .on('warn', (info) => Logger.warn(info))
    .start();

process.on('unhandledRejection', (err) => {
    Logger.error('An unhandled promise rejection occured');
    Logger.stacktrace(err);
});
