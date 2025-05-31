import { Command, UseGroup } from '@discord-nestjs/core';
import { InsertMovieSubCommand } from './InsertMovieSubCommand';
import { GetMovieSubCommand } from './GetMovieSubCommand';
import { WatchMovieSubCommand } from './WatchMovieSubCommand';

@Command({
  name: 'movie',
  description: 'CRUD of movies',
  include: [
    UseGroup(
      {
        name: 'crud',
        description: 'CRUD of movies',
      },
      InsertMovieSubCommand,
      GetMovieSubCommand,
      WatchMovieSubCommand
    ),
  ],
})
export class MovieCommand {}
