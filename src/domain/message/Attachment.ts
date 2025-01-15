export class Attachment {
  constructor(
    public readonly id: number,
    public readonly attachment: string,
    public readonly name: string,
    public readonly size: number,
    public readonly url: string,
  ) {}
}
