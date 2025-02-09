import { MovieStatus } from './MovieStatus';
import { Review } from './Review';

export class Movie {
  constructor(
    public readonly title: string,
    public readonly launchDate: Date,
    public readonly duration: number,
    public status: MovieStatus = MovieStatus.TO_WATCH,
    public readonly id?: number,
    public readonly review?: Review[],
  ) {}
}
