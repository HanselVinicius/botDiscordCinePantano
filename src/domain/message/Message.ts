import { Author } from '../user/Author';
import { Attachment } from './Attachment';

export class Message {
  constructor(
    private readonly id: bigint | number,
    private readonly content: string,
    private readonly channelId: bigint | number,
    private readonly guildId: bigint | number,
    private readonly author: Author,
    private readonly timestamp: Date,
    private readonly attachment?: Attachment[],
  ) {}
}
