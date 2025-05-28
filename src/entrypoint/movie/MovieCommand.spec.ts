import { InsertMovieService } from '../../domain/movie/service/InsertMovieService';
import { InsertMovieSubCommand } from './InsertMovieSubCommand';
import { GetMovieSubCommand } from './GetMovieSubCommand';
import { GetMovieService } from 'src/domain/movie/service/GetMovieService';
import { GetMovieDto } from './dto/GetMovieDto';
import { WatchMovieService } from '../../domain/movie/service/WatchMovieService';
import { WatchMovieSubCommand } from './WatchMovieSubCommand';
import { InsertMovieDto } from './dto/insertMovieDto';
import { Movie } from 'src/domain/movie/Movie';
import { MovieStatus } from 'src/domain/movie/MovieStatus';

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

  describe('GetMovieSubCommand', () => {
    let getMovieServiceMock: jest.Mocked<GetMovieService>;
    let getMovieSubCommand: GetMovieSubCommand;
    const mockChannel = {
      send: jest.fn(),
    };
    const interactionMock: any = [{
      channel: mockChannel
    }];

    const movieDto: GetMovieDto = {
      is_seen: false,
      limit: 10,
      page: 1,
    };

    beforeEach(() => {
      getMovieServiceMock = {
        getMovieList: jest.fn(),
      } as unknown as jest.Mocked<GetMovieService>;

      getMovieSubCommand = new GetMovieSubCommand(getMovieServiceMock);
      jest.clearAllMocks();
    });

    it('should return a message if no movies found', async () => {
      getMovieServiceMock.getMovieList.mockResolvedValueOnce([]);

      const result = await getMovieSubCommand.execute(movieDto, interactionMock);

      expect(result).toBe('Nenhum filme encontrado');
      expect(mockChannel.send).not.toHaveBeenCalled();
    });

    it('should send messages for each movie and return summary message', async () => {
      const movieList: Movie[] = [
        {
          id: 1,
          title: 'Coringa',
          duration: 122,
          image: 'http://image.url',
          launchDate: null,
          movieStatus: MovieStatus.TO_WATCH,
          review: [],
        }
      ];

      getMovieServiceMock.getMovieList.mockResolvedValueOnce(movieList);

      const result = await getMovieSubCommand.execute(movieDto, interactionMock);

      expect(result).toBe('Listado todos os filmes...');
      expect(mockChannel.send).toHaveBeenCalledWith(
        `Title: Coringa - Poster: http://image.url - Status: TO_WATCH`
      );
    });
  });


  describe('WatchMovieSubcommand', () => {
    let watchMovieServiceMock: jest.Mocked<WatchMovieService>;
    let watchMovieSubCommand: WatchMovieSubCommand;
    beforeEach(() => {
      watchMovieServiceMock = {
        watchMovie: jest.fn().mockResolvedValueOnce(undefined),
      } as jest.Mocked<WatchMovieService>;

      watchMovieSubCommand = new WatchMovieSubCommand(watchMovieServiceMock);

    });

    it('should call watchMovieService', () => {
      const externalId = '12345';

      watchMovieSubCommand.execute(externalId);

      expect(watchMovieServiceMock.watchMovie).toHaveBeenCalledWith(externalId);
    });
  });

});
