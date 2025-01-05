import { AddMovieService } from 'src/domain/movie/service/AddMovieService';
import { Movie } from 'src/domain/movie/Movie';
import { AddMovieGateway } from '../gateway/AddMovieGateway';

export class AddMovieUseCase implements AddMovieService {
  constructor(private readonly sendMovieGateway: AddMovieGateway) {}

  public async addMovie(movie: Movie): Promise<void> {
    this.sendMovieGateway.addMovie(movie);
  }
}
