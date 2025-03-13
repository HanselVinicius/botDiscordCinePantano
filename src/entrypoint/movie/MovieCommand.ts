import { Command, UseGroup } from '@discord-nestjs/core';
import { InsertMovieSubCommand } from './InsertMovieSubCommand';
import { GetMovieSubCommand } from './GetMovieSubCommand';

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
      GetMovieSubCommand
    ),
  ],
})
export class MovieCommand {}
