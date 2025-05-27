import { GetMovieUseCase } from './GetMovieUseCase';
import { GetMovieDto } from '../../domain/movie/dto/GetMovieDto';
import { Movie } from '../../domain/movie/Movie';
import { GetMovieGateway } from '../gateway/movie/GetMovieGateway';
import { MovieStatus } from 'src/domain/movie/MovieStatus';

describe('GetMovieUseCase', () => {
    let mockGetMovieGateway: jest.Mocked<GetMovieGateway>;
    let getMovieUseCase: GetMovieUseCase;

    beforeEach(() => {
        mockGetMovieGateway = {
            getMovieList: jest.fn(),
        } as jest.Mocked<GetMovieGateway>;
        getMovieUseCase = new GetMovieUseCase(mockGetMovieGateway);
    });

    it('deve chamar getMovieList no GetMovieGateway e retornar lista de filmes', async () => {
        const getMovieDto: GetMovieDto = {
            movieStatus: MovieStatus.TO_WATCH,
            limit: 10,
            page: 1,
        };

        const mockMovies: Movie[] = [
            new Movie('title', new Date(), 10),
            new Movie('title', new Date(), 10)
        ];

        mockGetMovieGateway.getMovieList.mockResolvedValue(mockMovies);

        const result = await getMovieUseCase.getMovieList(getMovieDto);

        expect(mockGetMovieGateway.getMovieList).toHaveBeenCalledWith(getMovieDto);
        expect(result).toEqual(mockMovies);
    });

    it('deve lançar um erro quando o GetMovieGateway falhar', async () => {
        const getMovieDto: GetMovieDto = {
            movieStatus: MovieStatus.TO_WATCH,
            limit: 10,
            page: 1,
        };

        mockGetMovieGateway.getMovieList.mockRejectedValue(new Error('Failed to fetch movies'));

        await expect(getMovieUseCase.getMovieList(getMovieDto)).rejects.toThrow('Failed to fetch movies');
    });
});
