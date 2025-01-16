import { connect, Connection, Channel } from 'amqplib';
import { Queue, QUEUES } from '../../shared/queues';
import { AmqpException } from '../exception/AmqpException';

export class AmqpManager {
  private connection: Connection;
  private channel: Channel;

  public async connect(url: string): Promise<void> {
    try {
      this.connection = await connect(url);
      this.channel = await this.connection.createChannel();

      await this.createQueue();
    } catch (error) {
      console.error('Erro ao conectar ao RabbitMQ:', error);
      throw new AmqpException('Erro ao conectar ao RabbitMQ');
    }
  }

  public async createQueue(): Promise<void> {
    try {
      const queues = Array.from(QUEUES.values());
      await Promise.all(
        queues.map(async (queue) => {
          await this.channel.assertExchange(queue.exchange, 'direct', {
            durable: true,
          });
          await this.channel.assertQueue(queue.name, {
            durable: true,
          });
          await this.channel.bindQueue(
            queue.name,
            queue.exchange,
            queue.routingKey,
          );
        }),
      );
    } catch (error) {
      console.error('Erro ao criar a fila:', error);
      throw new AmqpException('Erro ao criar a fila');
    }
  }

  public async sendMessage(message: string, queue: Queue): Promise<void> {
    if (!this.channel) {
      throw new AmqpException(
        'Canal não está disponível. Conecte-se ao RabbitMQ primeiro.',
      );
    }
    try {
      this.channel.publish(
        queue.exchange,
        queue.routingKey,
        Buffer.from(message),
        {
          persistent: true,
        },
      );
    } catch (error) {
      throw new AmqpException('Erro ao enviar mensagem para a exchange');
    }
  }
}
