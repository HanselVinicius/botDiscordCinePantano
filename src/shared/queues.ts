export interface Queue {
  name: string;
  exchange: string;
  routingKey: string;
}

export const MOVIE_QUEUE = 'movieQueue';
export const MESSAGE_QUEUE = 'messageQueue';
export const QUEUES: Map<string, Queue> = new Map<string, Queue>([
  [
    MOVIE_QUEUE,
    {
      name: 'movieQueue',
      exchange: 'movieExchange',
      routingKey: 'movie',
    },
  ],
  [
    MESSAGE_QUEUE,
    {
      name: 'messageQueue',
      exchange: 'messageExchange',
      routingKey: 'message',
    },
  ],
]);
