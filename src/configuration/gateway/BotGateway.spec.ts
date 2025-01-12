import { Client } from 'discord.js';
import { BotGateway } from './BotGateway';

describe('BotGateway', () => {
  let botGateway: BotGateway;
  let client: jest.Mocked<Client>;

  beforeEach(async () => {
    client = {
      login: jest.fn(),
    } as unknown as jest.Mocked<Client>;
    botGateway = new BotGateway(client);
  });

  it('should call client.login when the ready event is emitted', () => {
    const loginSpy = jest
      .spyOn(client, 'login')
      .mockResolvedValueOnce(undefined);

    botGateway.onReady();

    expect(loginSpy).toHaveBeenCalledWith(process.env.DISCORD_TOKEN);
  });
});
