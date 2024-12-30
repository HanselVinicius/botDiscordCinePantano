import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { GatewayIntentBits } from 'discord.js';
import { BotGateway } from '../entrypoint/BotGateway';
import { PingCommand } from '../entrypoint/PingCommand';
import { MovieModule } from './movie.module';

@Module({
  imports: [
    MovieModule,
    DiscordModule.forRootAsync({
      useFactory: () => ({
        token: process.env.DISCORD_TOKEN,
        discordClientOptions: {
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.DirectMessages,
          ],
        },
      }),
    }),
  ],
  providers: [BotGateway, PingCommand],
})
export class AppModule {}
