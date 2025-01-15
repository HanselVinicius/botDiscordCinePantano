import { AmqpClient } from 'src/configuration/amqp/AmqpClient';
import { Author } from '../../domain/author/Author';
import { Message } from '../../domain/message/Message';
import { InsertMessageGatewayImpl } from './InsertMessageGatewayImpl';
import { MESSAGE_QUEUE } from '../../shared/queues';

describe('InsertMessageGatewayImpl', () => {
  const message = new Message(
    1,
    'content',
    1,
    1,
    new Author(1, 'name', false, null),
    new Date('2021-01-01'),
    [],
  );

  it('should send a message to the queue', () => {
    // Arrange
    const amqpClient: jest.Mocked<AmqpClient> = {
      sendToQueue: jest.fn(),
    } as unknown as jest.Mocked<AmqpClient>;
    const insertMessageGateway = new InsertMessageGatewayImpl(amqpClient);
    // Act
    insertMessageGateway.insertMessage(message);
    // Assert
    expect(amqpClient.sendToQueue).toHaveBeenCalledWith(
      MESSAGE_QUEUE,
      JSON.stringify(message),
    );
  });
});
