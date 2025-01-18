import { InsertMessageDto } from '../dto/InsertMessageDto';
import { Message } from '../Message';
import { MessageType } from '../vo/MessageType';

export class MessageFactory {
  public static createMessageFromInsert(
    insertMessageDto: InsertMessageDto,
    messageType: MessageType,
  ): Message {
    return new Message(
      insertMessageDto.id,
      insertMessageDto.content,
      insertMessageDto.channelId,
      insertMessageDto.guildId,
      insertMessageDto.author,
      insertMessageDto.timestamp,
      messageType,
      insertMessageDto.attachment,
    );
  }
}
