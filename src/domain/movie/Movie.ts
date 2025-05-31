import { MovieStatus } from './MovieStatus';
import { Review } from './Review';

export class Movie {
  constructor(
    public readonly title: string,
    public readonly launchDate: Date,
    public readonly duration: number,
    public movieStatus: MovieStatus = MovieStatus.TO_WATCH,
    public readonly externalId?: string,
    public readonly id?: number,
    public readonly review?: Review[],
    public readonly image?: string
  ) {}
}
