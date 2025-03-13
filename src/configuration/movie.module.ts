import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';
import { InsertMovieSubCommand } from 'src/entrypoint/movie/InsertMovieSubCommand';
import { MovieCommand } from 'src/entrypoint/movie/MovieCommand';
import { InsertMovieProvider } from './provider/movie/InsertMovieProvider';
import { GetMovieSubCommand } from 'src/entrypoint/movie/GetMovieSubCommand';
import { GetMovieProvider } from './provider/movie/GetMovieProvider';
import { InfraModule } from './Infra.module';

@Module({
  imports: [DiscordModule.forFeature(),InfraModule],
  providers: [MovieCommand, InsertMovieSubCommand,GetMovieSubCommand, ...InsertMovieProvider,...GetMovieProvider],
})
export class MovieModule {}
