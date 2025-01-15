import { InsertMessageGateway } from 'src/application/gateway/message/InsertMessageGateway';
import { AmqpClient } from 'src/configuration/amqp/AmqpClient';
import { Message } from 'src/domain/message/Message';
import { MESSAGE_QUEUE } from '../../shared/queues';

export class InsertMessageGatewayImpl implements InsertMessageGateway {
  constructor(private readonly amqpClient: AmqpClient) {}

  public async insertMessage(message: Message): Promise<void> {
    this.amqpClient.sendToQueue(MESSAGE_QUEUE, JSON.stringify(message));
  }
}
