import { WatchMovieGateway } from "../../application/gateway/movie/WatchMovieGateway";
import { MovieRepository } from "./repository/abstract/MovieRepository";
import { WatchMovieGatewayImpl } from "./WatchMovieGatewayImpl";

describe('WatchMovieGatewayImpl', () => {
    let watchMovieGateway: WatchMovieGateway;
    let movieRepository: jest.Mocked<MovieRepository>;

    beforeEach(() => {
        movieRepository = {
            watchMovie: jest.fn(),
            getMovieList: jest.fn(),
        } as jest.Mocked<MovieRepository>;

        watchMovieGateway = new WatchMovieGatewayImpl(movieRepository);
    });

    it('should call movieRepository.watchMovie with the correct externalId', async () => {
        // arrange
        const externalId = 'externalId';
        
        // act
        await watchMovieGateway.watchMovie(externalId);
        
        // assert
        expect(movieRepository.watchMovie).toHaveBeenCalledWith(externalId);
    });
});