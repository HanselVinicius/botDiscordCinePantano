import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { MessageCommand } from 'src/entrypoint/message/MessageCommand';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [MessageCommand],
})
export class MessageModule {}
