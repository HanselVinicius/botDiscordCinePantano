import { Provider } from '@nestjs/common';
import { AddMovieUseCase } from 'src/application/AddMovieUseCase';
import { AddMovieGateway } from 'src/application/gateway/AddMovieGateway';
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
      return new AddMovieGatewayImpl();
    },
  },
];
