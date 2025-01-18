import { Author } from '../../author/Author';
import { InsertMessageDto } from '../dto/InsertMessageDto';
import { MessageType } from '../vo/MessageType';
import { MessageFactory } from './MessageFactory';

describe('MessageFactory', () => {
  it('should create a message from insert message dto', () => {
    // Arrange
    const insertMessageDto = new InsertMessageDto(
      1,
      'content',
      1,
      1,
      new Author(1, 'name', false, null),
      new Date('2021-01-01'),
      [],
    );

    // Act
    const message = MessageFactory.createMessageFromInsert(
      insertMessageDto,
      MessageType.MOVIE,
    );

    //assert
    expect(message.id).toBe(insertMessageDto.id);
    expect(message.content).toBe(insertMessageDto.content);
    expect(message.channelId).toBe(insertMessageDto.channelId);
    expect(message.guildId).toBe(insertMessageDto.guildId);
    expect(message.timestamp).toBe(insertMessageDto.timestamp);
    expect(message.attachment).toBe(insertMessageDto.attachment);
  });
});
