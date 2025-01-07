import { AddMovieService } from "../../domain/movie/service/AddMovieService";
import { AddMovieSubCommand } from "./AddMovieSubCommand";
import { Movie } from "../../domain/movie/Movie";
import { MovieFactory } from "../../domain/movie/factory/MovieFactory";
import { AddMovieDto } from "./dto/AddMovieDto";

describe('MovieCommands',()=>{

  describe('AddMovieSubCommand',()=>{
    let addMovieSubCommand: AddMovieSubCommand;
    let addMovieServiceMock : jest.Mocked<AddMovieService>;
    let addMovieFactory: jest.Mock<MovieFactory>;
    let movieDto: AddMovieDto = {
      title: 'movieName',
      launch_date: '10/10/2024',
      duration: 120
    };
    let movie:Movie;
    beforeEach(async () => {
      addMovieServiceMock = {
        addMovie: jest.fn().mockResolvedValueOnce(undefined),
      } as unknown as jest.Mocked<AddMovieService>;
      movie = new Movie(movieDto.title, new Date('2024-10-10'), movieDto.duration);
      addMovieFactory = {
        createMovie: jest.fn().mockReturnValueOnce(movie),
      } as unknown as jest.Mock<MovieFactory>;

    });
    it('should return a message with the movie name', async () => {
      addMovieSubCommand = new AddMovieSubCommand(addMovieServiceMock);

      const response = await addMovieSubCommand.execute(movieDto);
      expect(response).toBe(`
    🎬 **${movieDto.title}** foi adicionado à lista de filmes para assistir!
    🗓️ *Data de Lançamento:* **${movieDto.launch_date}**  
    ⏳ *Duração:* **${movieDto.duration} minutos**`);
    });

    it('should return an error with invalid launchDate', async () => {
      addMovieSubCommand = new AddMovieSubCommand(addMovieServiceMock);
      movieDto.launch_date = '10-10-2024';
    
      const response = await addMovieSubCommand.execute(movieDto);
    
      expect(response).toBe("❌ **Erro:** Invalid date format. Expected dd/mm/yyyy ⚠️");
    });
    

  });
});