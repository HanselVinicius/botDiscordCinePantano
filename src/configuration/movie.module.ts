import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { InsertMovieSubCommand } from 'src/entrypoint/movie/InsertMovieSubCommand';
import { MovieCommand } from 'src/entrypoint/movie/MovieCommand';
import { InsertMovieProvider } from './provider/movie/InsertMovieProvider';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [MovieCommand, InsertMovieSubCommand, ...InsertMovieProvider],
})
export class MovieModule {}
