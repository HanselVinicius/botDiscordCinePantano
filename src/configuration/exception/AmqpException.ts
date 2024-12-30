export class AmqpException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AmqpException';
  }
}
