import { Message } from 'src/domain/message/Message';
import { InsertMessageService } from 'src/domain/message/service/InsertMessageService';
import { InsertMessageGateway } from '../gateway/message/InsertMessageGateway';

export class InsertMessageUseCase implements InsertMessageService {
  constructor(private readonly insertMessageGateway: InsertMessageGateway) {}

  public async insertMessage(message: Message): Promise<void> {
    await this.insertMessageGateway.insertMessage(message);
  }
}
