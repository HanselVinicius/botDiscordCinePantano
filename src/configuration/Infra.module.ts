import { Module } from '@nestjs/common';
import { InfraProvider } from './provider/infra/InfraProvider';

@Module({
  providers: [...InfraProvider],
  exports: ['amqpClient'],
})
export class InfraModule {}
