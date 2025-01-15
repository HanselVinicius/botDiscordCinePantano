import { Provider } from '@nestjs/common';
import { InsertMovieGateway } from 'src/application/gateway/movie/InsertMovieGateway';
import { InsertMovieUseCase } from 'src/application/movie/InsertMovieUseCase';
import { AmqpClient } from 'src/configuration/amqp/AmqpClient';
import { AmqpManager } from 'src/configuration/amqp/AmqpManager';
import { InsertMovieGatewayImpl } from 'src/gateway/movie/InsertMovieGatewayImpl';

export const InsertMovieProvider: Provider[] = [
  {
    provide: 'InsertMovieService',
    useFactory: (
      insertMovieGateway: InsertMovieGateway,
    ): InsertMovieUseCase => {
      return new InsertMovieUseCase(insertMovieGateway);
    },
    inject: ['InsertMovieGateway'],
  },
  {
    provide: 'InsertMovieGateway',
    useFactory: (): InsertMovieGatewayImpl => {
      return new InsertMovieGatewayImpl(new AmqpClient(new AmqpManager()));
    },
  },
];
