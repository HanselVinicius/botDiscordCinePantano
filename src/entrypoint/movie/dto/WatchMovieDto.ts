import { Param, ParamType } from '@discord-nestjs/core';

export class WatchMovieDto{
    @Param({
        name: "external_id",
        description: "External ID of the movie to watch",
        type: ParamType.STRING,
        required: true
    })
    externalId: string;   
}