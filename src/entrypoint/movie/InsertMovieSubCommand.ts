import { Handler, IA, SubCommand } from '@discord-nestjs/core';
import { SlashCommandPipe } from '@discord-nestjs/common';
import { InsertMovieService } from '../../domain/movie/service/InsertMovieService';
import { MovieFactory } from '../../domain/movie/factory/MovieFactory';
import { Inject } from '@nestjs/common';
import { InsertMovieDto } from './dto/InsertMovieDto';

@SubCommand({
  name: 'add',
  description: 'Add a movie to the To-See List',
})
export class InsertMovieSubCommand {
  constructor(
    @Inject('InsertMovieService')
    private readonly sendMovieService: InsertMovieService,
  ) {}

  @Handler()
  public async execute(
    @IA(SlashCommandPipe) options: InsertMovieDto,
  ): Promise<string> {
    try {
      const movie = MovieFactory.createMovie(options);
      await this.sendMovieService.insertMovie(movie);
      return `
    🎬 **${options.title}** foi adicionado à lista de filmes para assistir!
    🗓️ *Data de Lançamento:* **${options.launch_date}**  
    ⏳ *Duração:* **${options.duration} minutos**`;
    } catch (e) {
      return `❌ **Erro:** ${e.message} ⚠️`;
    }
  }
}
