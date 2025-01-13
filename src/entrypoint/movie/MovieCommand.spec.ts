import { InsertMovieService } from '../../domain/movie/service/InsertMovieService';
import { InsertMovieSubCommand } from './InsertMovieSubCommand';
import { Movie } from '../../domain/movie/Movie';
import { insertMovieDto } from './dto/insertMovieDto';

describe('MovieCommands', () => {
  describe('InsertMovieSubCommand', () => {
    let insertMovieSubCommand: InsertMovieSubCommand;
    let addMovieServiceMock: jest.Mocked<InsertMovieService>;
    const movieDto: insertMovieDto = {
      title: 'movieName',
      launch_date: '10/10/2024',
      duration: 120,
    };
    let movie: Movie;
    beforeEach(async () => {
      addMovieServiceMock = {
        insertMovie: jest.fn().mockResolvedValueOnce(undefined),
      } as unknown as jest.Mocked<InsertMovieService>;
      movie = new Movie(
        movieDto.title,
        new Date('2024-10-10'),
        movieDto.duration,
      );
    });
    it('should return a message with the movie name', async () => {
      insertMovieSubCommand = new InsertMovieSubCommand(addMovieServiceMock);

      const response = await insertMovieSubCommand.execute(movieDto);
      expect(response).toBe(`
    🎬 **${movieDto.title}** foi adicionado à lista de filmes para assistir!
    🗓️ *Data de Lançamento:* **${movieDto.launch_date}**  
    ⏳ *Duração:* **${movieDto.duration} minutos**`);
    });

    it('should return an error with invalid launchDate', async () => {
      insertMovieSubCommand = new InsertMovieSubCommand(addMovieServiceMock);
      movieDto.launch_date = '10-10-2024';

      const response = await insertMovieSubCommand.execute(movieDto);

      expect(response).toBe(
        '❌ **Erro:** Invalid date format. Expected dd/mm/yyyy ⚠️',
      );
    });
  });
});
