import { Review } from './Review';

export class Movie {
  constructor(
    private readonly title: string,
    private readonly launchDate: Date,
    private readonly duration: number,
    private readonly id?: number,
    private readonly review?: Review[],
  ) {}
}
