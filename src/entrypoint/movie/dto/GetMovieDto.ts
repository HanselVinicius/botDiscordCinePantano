import { Param, ParamType } from '@discord-nestjs/core';

export class GetMovieDto{
    @Param({
        name: "is_seen",
        description: "Is the movie seen or not",
        type: ParamType.BOOLEAN,
        required: true
    })
    is_seen: boolean;

    @Param({
        name:"limit",
        description: "Limit the number of movies",
        type: ParamType.INTEGER,
        required: true
    })
    limit: number;

    @Param({
        name: "page",
        description: "Page number",
        type: ParamType.INTEGER,
        required: true
    })
    page: number;
}