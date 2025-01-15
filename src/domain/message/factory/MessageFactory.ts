import { InsertMessageDto } from '../dto/InsertMessageDto';
import { Message } from '../Message';

export class MessageFactory {
  public static createMessageFromInsert(
    insertMessageDto: InsertMessageDto,
  ): Message {
    return new Message(
      insertMessageDto.id,
      insertMessageDto.content,
      insertMessageDto.channelId,
      insertMessageDto.guildId,
      insertMessageDto.author,
      insertMessageDto.timestamp,
      insertMessageDto.attachment,
    );
  }
}
