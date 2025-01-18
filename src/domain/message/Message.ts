import { Author } from '../author/Author';
import { Attachment } from './Attachment';
import { MessageType } from './vo/MessageType';

export class Message {
  constructor(
    public readonly id: number,
    public readonly content: string,
    public readonly channelId: number,
    public readonly guildId: number,
    public readonly author: Author,
    public readonly timestamp: Date,
    public readonly messageType: MessageType,
    public readonly attachment?: Attachment[],
  ) {}
}
