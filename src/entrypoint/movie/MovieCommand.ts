import { Command, UseGroup } from '@discord-nestjs/core';
import { InsertMovieSubCommand } from './InsertMovieSubCommand';

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
    ),
  ],
})
export class MovieCommand {}
