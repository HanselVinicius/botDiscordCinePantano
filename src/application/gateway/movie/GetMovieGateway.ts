import { GetMovieDto } from "src/domain/movie/dto/GetMovieDto";
import { Movie } from "src/domain/movie/Movie";

export interface GetMovieGateway {
    getMovieList(getMovieDto:GetMovieDto): Promise<Movie[]>;
}