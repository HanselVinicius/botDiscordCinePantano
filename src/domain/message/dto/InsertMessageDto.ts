import { Author } from 'src/domain/author/Author';
import { Attachment } from '../Attachment';

export class InsertMessageDto {
  constructor(
    public readonly id: number,
    public readonly content: string,
    public readonly channelId: number,
    public readonly guildId: number,
    public readonly author: Author,
    public readonly timestamp: Date,
    public readonly attachment?: Attachment[],
  ) {}
}
