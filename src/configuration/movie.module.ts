import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { AddMovieSubCommand } from 'src/entrypoint/movie/AddMovieSubCommand';
import { MovieCommand } from 'src/entrypoint/movie/MovieCommand';
import { AddMovieProvider } from './provider/movie/AddMovieProvider';

@Module({
  imports: [DiscordModule.forFeature()],
  providers: [MovieCommand, AddMovieSubCommand, ...AddMovieProvider],
})
export class MovieModule {}
