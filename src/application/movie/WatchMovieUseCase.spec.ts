import { WatchMovieGateway } from "../gateway/movie/WatchMovieGateway";
import { WatchMovieUseCase } from "./WatchMovieUseCase";

describe('WatchMovieUseCase', () => {

    let watchMovieGateway: jest.Mocked<WatchMovieGateway>;
    let watchMovieUseCase: WatchMovieUseCase;

    beforeEach(() => {
        watchMovieGateway = {
            watchMovie: jest.fn(),
        } as jest.Mocked<WatchMovieGateway>;
        
        watchMovieUseCase = new WatchMovieUseCase(watchMovieGateway);    
    });
    it('should call watchMovieGateway ', async () => {
        // arrange
        const externalId = 'externalId';
        // act
        await watchMovieUseCase.watchMovie(externalId);
        //assert
        expect(watchMovieGateway.watchMovie).toHaveBeenCalled();
    });


});