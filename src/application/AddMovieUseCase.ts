import { AddMovieService } from 'src/domain/movie/service/AddMovieService';
import { AddMovieGateway } from './gateway/AddMovieGateway';
import { Movie } from 'src/domain/movie/Movie';

export class AddMovieUseCase implements AddMovieService {
  constructor(private readonly sendMovieGateway: AddMovieGateway) {}

  public async addMovie(movie: Movie): Promise<void> {
    this.sendMovieGateway.addMovie(movie);
  }
}
