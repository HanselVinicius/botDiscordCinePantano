import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { MessageCommand } from 'src/entrypoint/message/MessageCommand';
import { InsertMessageProvider } from './provider/message/InsertMessageProvider';
import { InfraModule } from './Infra.module';

@Module({
  imports: [DiscordModule.forFeature(), InfraModule],
  providers: [MessageCommand, ...InsertMessageProvider],
})
export class MessageModule {}
