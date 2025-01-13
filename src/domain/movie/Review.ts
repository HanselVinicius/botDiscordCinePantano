import { Author } from '../user/Author';

export class Review {
  constructor(
    private readonly id: BigInt | number,
    private readonly movieId: number,
    private readonly review: string,
    private readonly rating: number,
    private readonly author: Author,
  ) {}
}
