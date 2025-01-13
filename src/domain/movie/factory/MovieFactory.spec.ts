import { InsertMovieDto } from '../dto/InsertMovieDto';
import { MovieFactory } from './MovieFactory';

describe('MovieFactory', () => {
  it('should sucessfully create a movie', () => {
    const insertMovieDto: InsertMovieDto = {
      title: 'The Godfather',
      launch_date: '24/03/1972',
      duration: 175,
    } as InsertMovieDto;
    const movie = MovieFactory.createMovie(insertMovieDto);
    expect(movie.title).toBe('The Godfather');
    expect(movie.launchDate).toEqual(new Date('1972-03-24'));
    expect(movie.duration).toBe(175);
  });

  it('should throw an error when the date format is invalid', () => {
    const insertMovieDto: InsertMovieDto = {
      title: 'The Godfather',
      launch_date: '24-03-1972',
      duration: 175,
    } as InsertMovieDto;
    expect(() => MovieFactory.createMovie(insertMovieDto)).toThrow(
      'Invalid date format. Expected dd/mm/yyyy',
    );
  });
});
