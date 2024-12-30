import { Movie } from 'src/domain/movie/Movie';

export interface AddMovieGateway {
  addMovie(movie: Movie): Promise<void>;
}
