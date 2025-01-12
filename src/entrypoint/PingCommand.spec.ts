import { CommandInteraction } from 'discord.js';
import { PingCommand } from './PingCommand';

describe('PingCommand', () => {
  let pingCommand: PingCommand;
  let interaction: jest.Mocked<CommandInteraction>;

  it('should return oi and the username of the user', async () => {
    interaction = {
      user: {
        username: 'username',
      },
    } as jest.Mocked<CommandInteraction>;
    pingCommand = new PingCommand();
    const response = await pingCommand.execute(interaction);
    expect(response).toBe('oi username');
  });
});
