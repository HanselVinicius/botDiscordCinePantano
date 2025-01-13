import { InsertMovieUseCase } from './InsertMovieUseCase';
import { InsertMovieGateway } from '../gateway/InsertMovieGateway';
import { Movie } from '../../domain/movie/Movie';

describe('InsertMovieUseCase', () => {
  let insertMovieGatewayMock: jest.Mocked<InsertMovieGateway>;
  let insertMovieUseCase: InsertMovieUseCase;
  let movie: Movie;

  beforeEach(() => {
    insertMovieGatewayMock = {
      InsertMovie: jest.fn(),
    } as jest.Mocked<InsertMovieGateway>;
    insertMovieUseCase = new InsertMovieUseCase(insertMovieGatewayMock);
    movie = new Movie('title', new Date(), 10);
  });

  it('should call gateway to insert a movie', async () => {
    await insertMovieUseCase.insertMovie(movie);

    expect(insertMovieGatewayMock.InsertMovie).toHaveBeenCalledWith(movie);
  });
});
