import { InsertMovieGateway } from '../../application/gateway/movie/InsertMovieGateway';
import { Movie } from '../../domain/movie/Movie';
import { InsertMovieGatewayImpl } from './InsertMovieGatewayImpl';
import { AmqpClient } from '../../configuration/amqp/AmqpClient';
import { MOVIE_QUEUE } from '../../shared/queues';

describe('InsertMovieGatewayImpl', () => {
  it('should send a movie to the queue', () => {
    const movie = new Movie('The Godfather', new Date('1972-03-24'), 175);
    const amqpClient: jest.Mocked<AmqpClient> = {
      sendToQueue: jest.fn(),
    } as unknown as jest.Mocked<AmqpClient>;
    const insertMovieGateway: InsertMovieGateway = new InsertMovieGatewayImpl(
      amqpClient,
    );
    insertMovieGateway.InsertMovie(movie);
    expect(amqpClient.sendToQueue).toHaveBeenCalledWith(
      MOVIE_QUEUE,
      JSON.stringify(movie),
    );
  });
});
