import { InsertMovieDto } from '../dto/InsertMovieDto';
import { Movie } from '../Movie';

export class MovieFactory {
  public static createMovie(insertMovieDto: InsertMovieDto): Movie {
    if (
      !/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(
        insertMovieDto.launch_date,
      )
    ) {
      throw new Error('Invalid date format. Expected dd/mm/yyyy');
    }
    const [day, month, year] = insertMovieDto.launch_date.split('/');
    return new Movie(
      insertMovieDto.title,
      new Date(`${year}-${month}-${day}`),
      insertMovieDto.duration,
    );
  }
}
