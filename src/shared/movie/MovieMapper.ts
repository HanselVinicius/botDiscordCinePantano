import { GetMovieDto } from "src/domain/movie/dto/GetMovieDto";

export class MovieMapper{
    public static toDomainGetMovieDto(isSeen:Boolean,limit:number,page:number): GetMovieDto {
        return new GetMovieDto(isSeen,limit,page);
    }
}