import { Message } from '../Message';

export interface InsertMessageService {
  insertMessage(message: Message): Promise<void>;
}
