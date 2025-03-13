import { GetMovieDto } from "src/domain/movie/dto/GetMovieDto";
import { GetMovieGatewayImpl } from "./GetMovieGatewayImpl";

describe('GetMovieGatewayImpl', () => {
    it('should get movie list', async () => {
        // arrange
        const movieRepository = {
            getMovieList: jest.fn().mockResolvedValue([]),
        };
        const getMovieGatewayImpl = new GetMovieGatewayImpl(movieRepository);
        const getMovieDto = new GetMovieDto(true, 10, 1);

        // act
        await getMovieGatewayImpl.getMovieList(getMovieDto);

        // assert
        expect(movieRepository.getMovieList).toHaveBeenCalledWith(getMovieDto);
    });
});