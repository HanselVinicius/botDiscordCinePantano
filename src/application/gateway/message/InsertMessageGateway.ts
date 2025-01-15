import { Message } from 'src/domain/message/Message';

export interface InsertMessageGateway {
  insertMessage(message: Message): Promise<void>;
}
