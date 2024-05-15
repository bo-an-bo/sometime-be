import { Webhook } from 'discord-webhook-node';
import * as dotenv from 'dotenv';
import * as process from 'node:process';

dotenv.config();
export const webhook = new Webhook(process.env.DISCORD_WEBHOOK_URL);
