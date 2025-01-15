import { Provider } from '@nestjs/common';
import { AmqpClient } from 'src/configuration/amqp/AmqpClient';
import { AmqpManager } from 'src/configuration/amqp/AmqpManager';

export const InfraProvider: Provider[] = [
  {
    provide: 'amqpClient',
    useFactory: (): AmqpClient => {
      return new AmqpClient(new AmqpManager());
    },
    inject: ['AmqpManager'],
  },
  {
    provide: 'AmqpManager',
    useFactory: (): AmqpManager => {
      return new AmqpManager();
    },
  },
];
