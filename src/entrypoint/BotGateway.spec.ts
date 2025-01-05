import { Client } from 'discord.js';
import { Test } from '@nestjs/testing';
import { BotGateway } from './BotGateway';

jest.mock('discord.js', () => ({
  Client: jest.fn().mockImplementation(() => ({
    login: jest.fn(),
  })),
}));

describe('BotGateway', () => {
  let botGateway: BotGateway;
  let client: jest.Mocked<Client>;

  beforeEach(async () => {
    client = {
      login: jest.fn(),
    } as unknown as jest.Mocked<Client>;
    botGateway = new BotGateway(client);
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: Client,
          useValue: client,
        }, {
          provide: BotGateway,
          useValue: botGateway,
        }],
    }).compile();

  });

  it('should call client.login when the ready event is emitted', () => {
    const loginSpy = jest.spyOn(client, 'login').mockResolvedValueOnce(undefined);

    botGateway.onReady();

    expect(loginSpy).toHaveBeenCalledWith(process.env.DISCORD_TOKEN);
  });
});
