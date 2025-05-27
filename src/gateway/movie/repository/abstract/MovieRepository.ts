import { Movie } from "src/domain/movie/Movie";
import { MovieStatus } from "src/domain/movie/MovieStatus";

export interface MovieRepository {
    getMovieList(options?:{isSeen:Boolean,limit:number,page:number}): Promise<Movie[]>;	

    watchMovie(externalId:string): Promise<Movie[]>;
    getMovieList(options?:{movieStatus:MovieStatus,limit:number,page:number}): Promise<Movie[]>;	
}