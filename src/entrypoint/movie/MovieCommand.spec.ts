import { InsertMovieService } from '../../domain/movie/service/InsertMovieService';
import { InsertMovieDto } from './dto/InsertMovieDto';
import { InsertMovieSubCommand } from './InsertMovieSubCommand';

describe('MovieCommands', () => {
  describe('InsertMovieSubCommand', () => {
    let insertMovieSubCommand: InsertMovieSubCommand;
    let insertMovieServiceMock: jest.Mocked<InsertMovieService>;
    const movieDto: InsertMovieDto = {
      title: 'movieName',
      launch_date: '10/10/2024',
      duration: 120,
    };
    beforeEach(async () => {
      insertMovieServiceMock = {
        insertMovie: jest.fn().mockResolvedValueOnce(undefined),
      } as unknown as jest.Mocked<InsertMovieService>;
    });
    it('should return a message with the movie name', async () => {
      insertMovieSubCommand = new InsertMovieSubCommand(insertMovieServiceMock);

      const response = await insertMovieSubCommand.execute(movieDto);
      expect(response).toBe(`
    🎬 **${movieDto.title}** foi adicionado à lista de filmes para assistir!
    🗓️ *Data de Lançamento:* **${movieDto.launch_date}**  
    ⏳ *Duração:* **${movieDto.duration} minutos**`);
    });

    it('should return an error with invalid launchDate', async () => {
      insertMovieSubCommand = new InsertMovieSubCommand(insertMovieServiceMock);
      movieDto.launch_date = '10-10-2024';

      const response = await insertMovieSubCommand.execute(movieDto);

      expect(response).toBe(
        '❌ **Erro:** Invalid date format. Expected dd/mm/yyyy ⚠️',
      );
    });
  });
});
