import { Param, ParamType } from '@discord-nestjs/core';

export class insertMovieDto {
  @Param({
    name: 'title',
    description: 'Title of the movie',
    type: ParamType.STRING,
    required: true,
  })
  title: string;

  @Param({
    name: 'launch_date',
    description: 'Launch date of the movie',
    type: ParamType.STRING,
    required: true,
  })
  launch_date: string;

  @Param({
    name: 'duration',
    description: 'Duration of the movie (in minutes)',
    type: ParamType.INTEGER,
    required: true,
  })
  duration: number;
}
