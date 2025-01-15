import { InsertMovieGateway } from 'src/application/gateway/movie/InsertMovieGateway';
import { AmqpClient } from 'src/configuration/amqp/AmqpClient';
import { Movie } from 'src/domain/movie/Movie';
import { MOVIE_QUEUE } from '../../shared/queues';

export class InsertMovieGatewayImpl implements InsertMovieGateway {
  constructor(private readonly amqpClient: AmqpClient) {}

  public async InsertMovie(movie: Movie): Promise<void> {
    await this.amqpClient.sendToQueue(MOVIE_QUEUE, JSON.stringify(movie));
  }
}
