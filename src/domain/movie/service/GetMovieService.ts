import { GetMovieDto } from "../dto/GetMovieDto";
import { Movie } from "../Movie";

export interface GetMovieService{
    getMovieList(getMovieDto:GetMovieDto): Promise<Movie[]>;
}