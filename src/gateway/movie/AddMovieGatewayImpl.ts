import { AddMovieGateway } from 'src/application/gateway/AddMovieGateway';
import { AmqpClient } from 'src/configuration/amqp/AmqpClient';
import { Movie } from 'src/domain/movie/Movie';
import { MOVIE_QUEUE } from '../../shared/queues';

export class AddMovieGatewayImpl implements AddMovieGateway {
  constructor(private readonly amqpClient: AmqpClient) {}

  public async addMovie(movie: Movie): Promise<void> {
    await this.amqpClient.sendToQueue(MOVIE_QUEUE, JSON.stringify(movie));
  }
}
