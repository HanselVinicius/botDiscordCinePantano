export class Attachment {
  constructor(
    private readonly id: bigint | number,
    private readonly attachment: string,
    private readonly name: string,
    private readonly size: number,
    private readonly url: string,
  ) {}
}
