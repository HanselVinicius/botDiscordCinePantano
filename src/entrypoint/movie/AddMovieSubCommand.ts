import { Handler, IA, SubCommand } from '@discord-nestjs/core';
import { AddMovieDto } from './dto/AddMovieDto';
import { SlashCommandPipe } from '@discord-nestjs/common';
import { AddMovieService } from 'src/domain/movie/service/AddMovieService';
import { MovieFactory } from 'src/domain/movie/factory/MovieFactory';
import { Inject } from '@nestjs/common';

@SubCommand({
  name: 'add',
  description: 'Add a movie to the To-See List',
})
export class AddMovieSubCommand {
  constructor(
    @Inject('AddMovieService')
    private readonly sendMovieService: AddMovieService,
  ) {}

  @Handler()
  public async execute(
    @IA(SlashCommandPipe) options: AddMovieDto,
  ): Promise<string> {
    try {
      const movie = MovieFactory.createMovie(options);
      await this.sendMovieService.addMovie(movie);
      return `
    🎬 **${options.title}** foi adicionado à lista de filmes para assistir!
    🗓️ *Data de Lançamento:* **${options.launch_date}**  
    ⏳ *Duração:* **${options.duration} minutos**`;
    } catch (e) {
      return `❌ **Erro:** ${e.message} ⚠️`;
    }
  }
}
