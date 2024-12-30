import { Review } from '../movie/Review';

export class Author {
  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly email: string,
    private readonly review: Review[],
  ) {}
}
