import { MessageCommand } from './MessageCommand';
import { InsertMessageDto } from '../..//domain/message/dto/InsertMessageDto';
import { Author } from '../..//domain/author/Author';
import { Attachment } from '../../domain/message/Attachment';
import { ClientEvents } from 'discord.js';
import { InsertMessageOptionsDto } from './dto/InsertMessageOptionsDto';
import { InsertMessageService } from '../../domain/message/service/insertMessageService';

describe('MessageCommand', () => {
  let messageCommand: MessageCommand;
  let insertMessageServiceMock: jest.Mocked<InsertMessageService>;

  beforeEach(() => {
    insertMessageServiceMock = {
      insertMessage: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<InsertMessageService>;

    messageCommand = new MessageCommand(insertMessageServiceMock);
  });

  describe('execute', () => {
    const mockArgs: ClientEvents['interactionCreate'] = [
      {
        user: { username: 'testUser' },
        channel: {
          messages: {
            fetch: jest.fn().mockResolvedValue({
              size: 5,
              forEach: (
                callback: (
                  value: {
                    id: string;
                    content: string;
                    channelId: string;
                    guildId: string;
                    author: { id: string; username: string; bot: boolean };
                    createdAt: Date;
                    attachments: Attachment[];
                  },
                  index: number,
                  array: {
                    id: string;
                    content: string;
                    channelId: string;
                    guildId: string;
                    author: { id: string; username: string; bot: boolean };
                    createdAt: Date;
                    attachments: Attachment[];
                  }[],
                ) => void,
              ) => {
                const messages = [
                  {
                    id: '1',
                    content: 'Message 1',
                    channelId: '123',
                    guildId: '456',
                    author: { id: '789', username: 'author1', bot: false },
                    createdAt: new Date(),
                    attachments: [],
                  },
                  {
                    id: '2',
                    content: 'Message 2',
                    channelId: '123',
                    guildId: '456',
                    author: { id: '790', username: 'author2', bot: false },
                    createdAt: new Date(),
                    attachments: [],
                  },
                ];
                messages.forEach(callback);
              },
            }),
          },
        },
      },
    ] as unknown as ClientEvents['interactionCreate'];

    const options = {
      messageType: 'MOVIE',
    } as unknown as InsertMessageOptionsDto;

    it('should return a success message after processing messages', async () => {
      const response = await messageCommand.execute(options, mockArgs);

      expect(response).toBe('oi testUser, 5 mensagens foram coletadas');
      expect(insertMessageServiceMock.insertMessage).toHaveBeenCalledTimes(2);
    });

    it('should handle errors and return a failure message', async () => {
      (mockArgs[0].channel.messages.fetch as jest.Mock).mockRejectedValue(
        new Error('Fetch failed'),
      );

      const response = await messageCommand.execute(options, mockArgs);

      expect(response).toBe('deu ruim');
      expect(insertMessageServiceMock.insertMessage).not.toHaveBeenCalled();
    });
  });

  describe('message mapping', () => {
    it('should map a message to InsertMessageDto correctly', async () => {
      const message = {
        id: '1',
        content: 'Message 1',
        channelId: '123',
        guildId: '456',
        author: { id: '789', username: 'author1', bot: false },
        createdAt: new Date(),
        attachments: [
          {
            id: '1001',
            url: 'url1',
            name: 'attachment1',
            size: 1024,
            contentType: 'image/png',
          },
        ],
      };

      const insertMessageDto = new InsertMessageDto(
        parseInt(message.id),
        message.content,
        parseInt(message.channelId),
        parseInt(message.guildId),
        new Author(
          parseInt(message.author.id),
          message.author.username,
          message.author.bot,
          [],
        ),
        message.createdAt,
        message.attachments.map((attachment) => {
          return new Attachment(
            parseInt(attachment.id),
            attachment.name,
            attachment.contentType,
            attachment.size,
            attachment.url,
          );
        }),
      );

      expect(insertMessageDto.content).toBe('Message 1');
      expect(insertMessageDto.author.name).toBe('author1');
      expect(insertMessageDto.attachment.length).toBe(1);
      expect(insertMessageDto.attachment[0].url).toBe('url1');
    });
  });
});
