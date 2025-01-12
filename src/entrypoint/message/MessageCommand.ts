import { Command, EventParams, Handler } from '@discord-nestjs/core';
import { ClientEvents } from 'discord.js';
@Command({
  name: 'scrap',
  description: 'Scraps a text channel',
})
export class MessageCommand {
  constructor() {}

  @Handler()
  async execute(
    @EventParams() args: ClientEvents['interactionCreate'],
  ): Promise<string> {
    try {
      const channel = args[0].channel;
      const messages = await channel.messages.fetch({ limit: 100 });
      messages.forEach((message) => {
        console.log(message);
      });
      return `oi ${args[0].user.username}, ${messages.size} mensagens foram coletadas`;
    } catch (e) {
      console.log(e);
      return 'deu ruim';
    }
  }
}
