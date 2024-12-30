import { Command, Handler } from '@discord-nestjs/core';
import { Injectable } from '@nestjs/common';
import { CommandInteraction } from 'discord.js';

@Command({
  name: 'ping',
  description: 'Ping pong command, to Health Check',
})
@Injectable()
export class PingCommand {
  @Handler()
  public async execute(interaction: CommandInteraction): Promise<string> {
    return 'oi ' + interaction.user.username;
  }
}
