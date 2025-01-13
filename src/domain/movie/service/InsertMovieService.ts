import { Movie } from '../Movie';

export interface InsertMovieService {
  insertMovie(movie: Movie): Promise<void>;
}
