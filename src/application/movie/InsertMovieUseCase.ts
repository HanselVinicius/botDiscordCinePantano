import { InsertMovieService } from 'src/domain/movie/service/InsertMovieService';
import { Movie } from 'src/domain/movie/Movie';
import { InsertMovieGateway } from '../gateway/InsertMovieGateway';

export class InsertMovieUseCase implements InsertMovieService {
  constructor(private readonly sendMovieGateway: InsertMovieGateway) {}

  public async insertMovie(movie: Movie): Promise<void> {
    this.sendMovieGateway.InsertMovie(movie);
  }
}
