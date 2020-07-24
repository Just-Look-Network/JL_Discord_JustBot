import 'dotenv/config';
import { owners } from './config/settings.json';
import BotClient from './core/BotClient';

const token: string = process.env.DISCORD_TOKEN;

const client: BotClient = new BotClient({ token, owners });
client.start();
