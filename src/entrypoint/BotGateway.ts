import { InjectDiscordClient, Once } from '@discord-nestjs/core';
import { Client } from 'discord.js';

export class BotGateway {
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
  ) {}

  @Once('ready')
  public onReady(): void {
    this.client.login(process.env.DISCORD_TOKEN);
  }
}
