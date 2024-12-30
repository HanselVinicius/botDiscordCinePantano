import { Command, UseGroup } from '@discord-nestjs/core';
import { AddMovieSubCommand } from './AddMovieSubCommand';

@Command({
  name: 'movie',
  description: 'CRUD of movies',
  include: [
    UseGroup(
      {
        name: 'crud',
        description: 'CRUD of movies',
      },
      AddMovieSubCommand,
    ),
  ],
})
export class MovieCommand {}
