import { GetMovieDto } from "src/domain/movie/dto/GetMovieDto";
import { GetMovieGatewayImpl } from "./GetMovieGatewayImpl";
import { MovieStatus } from "src/domain/movie/MovieStatus";

describe('GetMovieGatewayImpl', () => {
    it('should get movie list', async () => {
        // arrange
        const movieRepository = {
            getMovieList: jest.fn().mockResolvedValue([]),
            watchMovie: jest.fn().mockResolvedValue([]),

        };
        const getMovieGatewayImpl = new GetMovieGatewayImpl(movieRepository);
        const getMovieDto = new GetMovieDto(MovieStatus.TO_WATCH, 10, 1);

        // act
        await getMovieGatewayImpl.getMovieList(getMovieDto);

        // assert
        expect(movieRepository.getMovieList).toHaveBeenCalledWith(getMovieDto);
    });
});