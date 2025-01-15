import { Provider } from '@nestjs/common';
import { InsertMessageGateway } from 'src/application/gateway/message/InsertMessageGateway';
import { InsertMessageUseCase } from 'src/application/message/InsertMessageUseCase';
import { AmqpClient } from 'src/configuration/amqp/AmqpClient';
import { InsertMessageGatewayImpl } from 'src/gateway/message/InsertMessageGatewayImpl';

export const InsertMessageProvider: Provider[] = [
  {
    provide: 'InsertMessageService',
    useFactory: (
      insertMessageGateway: InsertMessageGateway,
    ): InsertMessageUseCase => {
      return new InsertMessageUseCase(insertMessageGateway);
    },
    inject: ['InsertMessageGateway'],
  },
  {
    provide: 'InsertMessageGateway',
    useFactory: (amqpClient: AmqpClient): InsertMessageGatewayImpl => {
      return new InsertMessageGatewayImpl(amqpClient);
    },
    inject: ['amqpClient'],
  },
];
