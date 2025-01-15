import { Author } from '../../domain/author/Author';
import { Message } from '../../domain/message/Message';
import { InsertMessageUseCase } from './InsertMessageUseCase';
import { InsertMessageGateway } from '../gateway/message/InsertMessageGateway';
import { Attachment } from '../../domain/message/Attachment';

describe('InsertMessageUseCase', () => {
  const message = new Message(
    1,
    'content',
    1,
    1,
    new Author(1, 'name', false, null),
    new Date('2021-01-01'),
    [new Attachment(1, 'name', 'type', 100, 'url')],
  );

  it('should insert call gateway to insert message', () => {
    // Arrange
    const insertMessageGateway = {
      insertMessage: jest.fn(),
    } as jest.Mocked<InsertMessageGateway>;
    const insertMessageService = new InsertMessageUseCase(insertMessageGateway);
    //act
    insertMessageService.insertMessage(message);
    //assert
    expect(insertMessageGateway.insertMessage).toHaveBeenCalledWith(message);
  });
});
