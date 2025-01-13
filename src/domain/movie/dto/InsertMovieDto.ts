export class InsertMovieDto {
  constructor(
    public readonly title: string,
    public readonly launch_date: string,
    public readonly duration: number,
  ) {}
}
