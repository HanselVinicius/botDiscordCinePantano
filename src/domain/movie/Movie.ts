import { Review } from './Review';

export class Movie {
  constructor(
    public readonly title: string,
    public readonly launchDate: Date,
    public readonly duration: number,
    public readonly id?: BigInt | number,
    public readonly review?: Review[],
  ) {}
}
