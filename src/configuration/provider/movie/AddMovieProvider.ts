import { Provider } from '@nestjs/common';
import { AddMovieGateway } from 'src/application/gateway/AddMovieGateway';
import { AddMovieUseCase } from 'src/application/movie/AddMovieUseCase';
import { AmqpClient } from 'src/configuration/amqp/AmqpClient';
import { AmqpManager } from 'src/configuration/amqp/AmqpManager';
import { AddMovieGatewayImpl } from 'src/gateway/movie/AddMovieGatewayImpl';

export const AddMovieProvider: Provider[] = [
  {
    provide: 'AddMovieService',
    useFactory: (addMovieGateway: AddMovieGateway): AddMovieUseCase => {
      return new AddMovieUseCase(addMovieGateway);
    },
    inject: ['AddMovieGateway'],
  },
  {
    provide: 'AddMovieGateway',
    useFactory: (): AddMovieGatewayImpl => {
      return new AddMovieGatewayImpl(new AmqpClient(new AmqpManager()));
    },
  },
];
