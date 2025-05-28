import { ApiRequestHandler } from "src/gateway/infra/ApiRequestHandler";
import { MovieRepositoryImpl } from "./MovieRepositoryImpl";
import { Movie } from "../../../domain/movie/Movie";
import { MovieStatus } from "../../../domain/movie/MovieStatus";


describe('MovieRepositoryImpl', () => {
    it('should get movie list and return an list of movies', async () => {
        // arrange
        const request = {
            get: jest.fn().mockResolvedValue([{} as Movie]),
        } as unknown as jest.Mocked<ApiRequestHandler>;
        const movieRepositoryImpl = new MovieRepositoryImpl(request);
        const options = { movieStatus: MovieStatus.WATCHED, limit: 10, page: 1 };
        
        // act
        const result = await movieRepositoryImpl.getMovieList(options);

        // assert
        expect(request.get).toHaveBeenCalledWith(`v1/movie?page=${options.page}&limit=${options.limit}&movieStatus=${options.movieStatus}`);
        expect(result).toEqual([{} as Movie]);
    });


    it('should watch a movie and return an list of movies', async () => {
        // arrange
        const request = {
            patchAuthenticated: jest.fn(),
        } as unknown as jest.Mocked<ApiRequestHandler>;
        const movieRepositoryImpl = new MovieRepositoryImpl(request);
        const externalId = '12345';
        
        // act
        await movieRepositoryImpl.watchMovie(externalId);

        // assert
        expect(request.patchAuthenticated).toHaveBeenCalledWith(`v1/movie/watch?${externalId}`, process.env.INTEGRATION_TOKEN);
    });

});