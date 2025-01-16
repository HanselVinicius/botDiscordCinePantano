import { Review } from '../movie/Review';

export class Author {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly isBot: boolean,
    public readonly review?: Review[],
  ) {}
}
