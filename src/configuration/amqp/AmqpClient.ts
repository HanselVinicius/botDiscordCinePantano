import { Injectable } from '@nestjs/common';
import { AmqpManager } from './AmqpManager';
import { QUEUES } from 'src/shared/queues';

@Injectable()
export class AmqpClient {
  public async sendToQueue(queue: string, message: string): Promise<void> {
    const conn = await this.connect();
    await conn.sendMessage(message, QUEUES.get(queue));
  }

  private async connect(): Promise<AmqpManager> {
    const manager = new AmqpManager();
    await manager.connect(process.env.AMQP_URL);
    return manager;
  }
}
