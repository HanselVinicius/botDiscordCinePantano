import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { GatewayIntentBits } from 'discord.js';
import { PingCommand } from '../entrypoint/PingCommand';
import { MovieModule } from './movie.module';
import { MessageModule } from './message.module';
import { BotGateway } from './gateway/BotGateway';

@Module({
  imports: [
    DiscordModule.forRootAsync({
      useFactory: () => ({
        token: process.env.DISCORD_TOKEN,
        discordClientOptions: {
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent,
          ],
        },
      }),
    }),
    MovieModule,
    MessageModule,
  ],
  providers: [BotGateway, PingCommand],
})
export class AppModule {}
