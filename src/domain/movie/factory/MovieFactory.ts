import { AddMovieDto } from 'src/entrypoint/movie/dto/AddMovieDto';
import { Movie } from '../Movie';

export class MovieFactory {
  public static createMovie(addMovieDto: AddMovieDto): Movie {
    if (
      !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(
        addMovieDto.launch_date,
      )
    ) {
      throw new Error('Invalid date format. Expected dd/mm/yyyy');
    }
    const [day, month, year] = addMovieDto.launch_date.split('/');
    return new Movie(
      addMovieDto.title,
      new Date(`${year}-${month}-${day}`),
      addMovieDto.duration,
    );
  }
}
