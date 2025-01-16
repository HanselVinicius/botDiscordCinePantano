import { Command, EventParams, Handler } from '@discord-nestjs/core';
import { Inject } from '@nestjs/common';
import { ClientEvents } from 'discord.js';
import { Author } from '../../domain/author/Author';
import { Attachment } from '../../domain/message/Attachment';
import { InsertMessageDto } from '../../domain/message/dto/InsertMessageDto';
import { MessageFactory } from '../../domain/message/factory/MessageFactory';
import { InsertMessageService } from '../../domain/message/service/InsertMessageService';
@Command({
  name: 'scrap',
  description: 'Scraps a text channel',
})
export class MessageCommand {
  constructor(
    @Inject('InsertMessageService')
    private readonly insertMessageService: InsertMessageService,
  ) {}

  @Handler()
  async execute(
    @EventParams() args: ClientEvents['interactionCreate'],
  ): Promise<string> {
    try {
      const channel = args[0].channel;
      const messages = await channel.messages.fetch({ limit: 100 });
      messages.forEach((message) => {
        const insertMessageDto = new InsertMessageDto(
          parseInt(message.id),
          message.content,
          parseInt(message.channelId),
          parseInt(message.guildId),
          new Author(
            parseInt(message.author.id),
            message.author.username,
            message.author.bot,
            null,
          ),
          message.createdAt,
          message.attachments.map((attachmentItem) => {
            return new Attachment(
              parseInt(attachmentItem.id),
              attachmentItem.contentType,
              attachmentItem.name,
              attachmentItem.size,
              attachmentItem.url,
            );
          }),
        );
        const messageDomain =
          MessageFactory.createMessageFromInsert(insertMessageDto);
        this.insertMessageService.insertMessage(messageDomain);
      });
      return `oi ${args[0].user.username}, ${messages.size} mensagens foram coletadas`;
    } catch (e) {
      console.error(e);
      return 'deu ruim';
    }
  }
}
