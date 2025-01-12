import { Injectable } from '@nestjs/common';
import { AmqpManager } from './AmqpManager';
import { QUEUES } from '../../shared/queues';

@Injectable()
export class AmqpClient {
  constructor(private readonly amqpManager: AmqpManager) {}

  public async sendToQueue(queue: string, message: string): Promise<void> {
    await this.connect();
    await this.amqpManager.sendMessage(message, QUEUES.get(queue));
  }

  private async connect(): Promise<void> {
    await this.amqpManager.connect(process.env.AMQP_URL);
  }
}
