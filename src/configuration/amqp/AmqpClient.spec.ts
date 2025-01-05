import { QUEUES } from "../../shared/queues";
import { AmqpClient } from "./AmqpClient";
import { AmqpManager } from "./AmqpManager";

describe('AmqpClient', () => {
  let amqpClient: AmqpClient;
  let amqpManager: jest.Mocked<AmqpManager>;

  beforeEach(() => {
    amqpManager = {
      connect: jest.fn(),
      sendMessage: jest.fn(),
    } as unknown as jest.Mocked<AmqpManager>;
    amqpClient = new AmqpClient(amqpManager);
  });

  it('should send a message to the queue', async () => {
    const queue = 'test';
    const message = 'test message';

    const sendMessageSpy = jest.spyOn(amqpManager, 'sendMessage');
    await amqpClient.sendToQueue(queue, message);

    expect(sendMessageSpy).toHaveBeenCalledWith(message, QUEUES.get(queue));
  });

  it('should connect to the AMQP server', async () => {
    const connectSpy = jest.spyOn(amqpManager, 'connect');
    await amqpClient['connect']();

    expect(connectSpy).toHaveBeenCalledWith(process.env.AMQP_URL);
  });
});