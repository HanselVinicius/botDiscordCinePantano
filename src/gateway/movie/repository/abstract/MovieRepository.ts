import { Movie } from "src/domain/movie/Movie";
import { MovieStatus } from "src/domain/movie/MovieStatus";

export interface MovieRepository {

    watchMovie(externalId:string): Promise<Movie[]>;
    getMovieList(options?:{movieStatus:MovieStatus,limit:number,page:number}): Promise<Movie[]>;	
}