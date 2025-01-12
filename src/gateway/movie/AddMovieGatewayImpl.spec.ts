import { AddMovieGateway } from '../../application/gateway/AddMovieGateway';
import { Movie } from '../../domain/movie/Movie';
import { AddMovieGatewayImpl } from './AddMovieGatewayImpl';
import { AmqpClient } from '../../configuration/amqp/AmqpClient';
import { MOVIE_QUEUE } from '../../shared/queues';

describe('AddMovieGatewayImpl', () => {
  it('should send a movie to the queue', () => {
    const movie = new Movie('The Godfather', new Date('1972-03-24'), 175);
    const amqpClient: jest.Mocked<AmqpClient> = {
      sendToQueue: jest.fn(),
    } as unknown as jest.Mocked<AmqpClient>;
    const AddMovieGateway: AddMovieGateway = new AddMovieGatewayImpl(
      amqpClient,
    );
    AddMovieGateway.addMovie(movie);
    expect(amqpClient.sendToQueue).toHaveBeenCalledWith(
      MOVIE_QUEUE,
      JSON.stringify(movie),
    );
  });
});
