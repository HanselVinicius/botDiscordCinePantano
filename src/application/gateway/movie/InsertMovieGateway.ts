import { Movie } from 'src/domain/movie/Movie';

export interface InsertMovieGateway {
  InsertMovie(movie: Movie): Promise<void>;
}
