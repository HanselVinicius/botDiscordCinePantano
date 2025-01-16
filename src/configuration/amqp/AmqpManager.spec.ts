import { AmqpManager } from './AmqpManager';
import { AmqpException } from '../exception/AmqpException';
import { connect, Connection, Channel } from 'amqplib';

jest.mock('amqplib', () => ({
  connect: jest.fn(),
  Connection: jest.fn(),
  Channel: jest.fn(),
}));

describe('AmqpManager', () => {

  let amqpManager: AmqpManager;
  let mockChannel: jest.Mocked<Channel>;
  let mockConnection: jest.Mocked<Connection>;

  beforeEach(() => {
    mockChannel = {
      assertExchange: jest.fn().mockResolvedValue(undefined),
      assertQueue: jest.fn().mockResolvedValue(undefined),
      bindQueue: jest.fn().mockResolvedValue(undefined),
      publish: jest.fn().mockResolvedValue(true),
    } as unknown as jest.Mocked<Channel>;

    mockConnection = {
      createChannel: jest.fn().mockResolvedValue(mockChannel),
    } as unknown as jest.Mocked<Connection>;

    (connect as jest.Mock).mockResolvedValue(mockConnection);

    amqpManager = new AmqpManager();
  });
  describe('connect', () => {
    it('should successfully connect to RabbitMQ', async () => {
      await amqpManager.connect('amqp://localhost');
      expect(connect).toHaveBeenCalledWith('amqp://localhost');
      expect(mockConnection.createChannel).toHaveBeenCalled();
    });

    it('should throw AmqpException when connection fails', async () => {
      (connect as jest.Mock).mockRejectedValue(new Error('Connection failed'));

      await expect(amqpManager.connect('amqp://localhost')).rejects.toThrow(AmqpException);
      await expect(amqpManager.connect('amqp://localhost')).rejects.toThrow('Erro ao conectar ao RabbitMQ');
    });
  });

  describe('createQueue', () => {
    it('should successfully create and bind queues', async () => {
      await amqpManager.connect('amqp://localhost');
      await amqpManager.createQueue();

      expect(mockChannel.assertExchange).toHaveBeenCalled();
      expect(mockChannel.assertQueue).toHaveBeenCalled();
      expect(mockChannel.bindQueue).toHaveBeenCalled();
    });

    it('should throw AmqpException when creating the queue fails', async () => {
      mockChannel.assertExchange.mockRejectedValueOnce(new Error('Queue creation failed'));

      await expect(amqpManager.createQueue()).rejects.toThrow(AmqpException);
      await expect(amqpManager.createQueue()).rejects.toThrow('Erro ao criar a fila');
    });
  });

  it('should send a message to the specified queue', async () => {
    const mockQueue = {
      exchange: 'test_exchange',
      routingKey: 'test_routing_key',
      name: 'test_queue',
    };

    await amqpManager.connect('amqp://localhost');
    await amqpManager.sendMessage('Hello, world!', mockQueue);

    expect(mockChannel.publish).toHaveBeenCalledWith(
      'test_exchange',
      'test_routing_key',
      expect.any(Buffer),
      { persistent: true }
    );
  });

  it('should throw AmqpException if no channel is available', async () => {
    const mockQueue = {
      exchange: 'test_exchange',
      routingKey: 'test_routing_key',
      name: 'test_queue',
    };

    const amqpManagerWithoutChannel = new AmqpManager();

    await expect(amqpManagerWithoutChannel.sendMessage('Hello, world!', mockQueue)).rejects.toThrow(AmqpException);
    await expect(amqpManagerWithoutChannel.sendMessage('Hello, world!', mockQueue)).rejects.toThrow('Canal não está disponível. Conecte-se ao RabbitMQ primeiro.');
  });

  it('should throw AmqpException when message sending fails', async () => {
    const mockQueue = {
      exchange: 'test_exchange',
      routingKey: 'test_routing_key',
      name: 'test_queue',
    };

    (mockChannel.publish as jest.Mock).mockRejectedValue(new AmqpException('Publish failed'));

    await expect(amqpManager.sendMessage('Hello, world!', mockQueue)).rejects.toThrow(AmqpException);
    await expect(amqpManager.sendMessage('Hello, world!', mockQueue)).rejects.toThrow('Canal não está disponível. Conecte-se ao RabbitMQ primeiro.');
  });
});
