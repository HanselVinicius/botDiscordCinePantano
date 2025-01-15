import { Author } from '../author/Author';

export class Review {
  constructor(
    private readonly id: number,
    private readonly movieId: number,
    private readonly review: string,
    private readonly rating: number,
    private readonly author: Author,
  ) {}
}
