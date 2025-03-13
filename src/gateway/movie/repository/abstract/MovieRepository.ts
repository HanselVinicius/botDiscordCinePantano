import { Movie } from "src/domain/movie/Movie";

export interface MovieRepository {
    getMovieList(options?:{isSeen:Boolean,limit:number,page:number}): Promise<Movie[]>;	
}