import { GetMovieDto } from "src/domain/movie/dto/GetMovieDto";
import { MovieStatus } from "src/domain/movie/MovieStatus";

export class MovieMapper{
    public static toDomainGetMovieDto(isSeen:Boolean,limit:number,page:number): GetMovieDto {
        const movieStatus = isSeen ? MovieStatus.WATCHED : MovieStatus.TO_WATCH;
        return new GetMovieDto(movieStatus,limit,page);
    }
}