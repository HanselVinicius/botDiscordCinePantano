import { Module } from '@nestjs/common';
import { InfraProvider } from './provider/infra/InfraProvider';
import { MovieRepositoryProvider } from './provider/movie/MovieRepositoryProvider';

@Module({
  providers: [...InfraProvider,...MovieRepositoryProvider],
  exports: ['amqpClient','MovieRepository'],
})
export class InfraModule {}
