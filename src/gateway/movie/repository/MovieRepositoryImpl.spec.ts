import { ApiRequestHandler } from "src/gateway/infra/ApiRequestHandler";
import { MovieRepositoryImpl } from "./MovieRepositoryImpl";
import { Movie } from "src/domain/movie/Movie";

describe('MovieRepositoryImpl', () => {
    it('should get movie list and return an list of movies', async () => {
        // arrange
        const request = {
            getAuthenticated: jest.fn().mockResolvedValue([{} as Movie]),
        } as unknown as jest.Mocked<ApiRequestHandler>;
        const movieRepositoryImpl = new MovieRepositoryImpl(request);
        const options = { isSeen: true, limit: 10, page: 1 };
        
        // act
        const result = await movieRepositoryImpl.getMovieList(options);

        // assert
        expect(request.getAuthenticated).toHaveBeenCalledWith(`v1/movie?page=${options.page}&limit=${options.limit}`, process.env.INTEGRATION_TOKEN);
        expect(result).toEqual([{} as Movie]);
    });
});