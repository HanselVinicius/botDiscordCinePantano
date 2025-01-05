import { AddMovieUseCase } from "./AddMovieUseCase";
import { AddMovieGateway } from "../gateway/AddMovieGateway";
import { Movie } from "../../domain/movie/Movie";

describe('AddMovieUseCase', () => {
  let AddMovieGatewayMock: jest.Mocked<AddMovieGateway>;
  let addMovieUseCase: AddMovieUseCase;
  let movie:Movie;

  beforeEach(() => {
    AddMovieGatewayMock = {
      addMovie: jest.fn(),
    } as jest.Mocked<AddMovieGateway>;
    addMovieUseCase = new AddMovieUseCase(AddMovieGatewayMock);
    movie = new Movie('title', new Date(), 10,);
  });

  it('should call gateway to add a movie', async () => {
    await addMovieUseCase.addMovie(movie);

    expect(AddMovieGatewayMock.addMovie).toHaveBeenCalledWith(movie);
  });
});