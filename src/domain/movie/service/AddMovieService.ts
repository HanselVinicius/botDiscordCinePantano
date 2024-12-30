import { Movie } from '../Movie';

export interface AddMovieService {
  addMovie(movie: Movie): Promise<void>;
}
