import { AddMovieGateway } from 'src/application/gateway/AddMovieGateway';
import { AmqpClient } from 'src/configuration/amqp/AmqpClient';
import { Movie } from 'src/domain/movie/Movie';
import { MOVIE_QUEUE } from 'src/shared/queues';

export class AddMovieGatewayImpl implements AddMovieGateway {
  private readonly ampqClient = new AmqpClient();

  public async addMovie(movie: Movie): Promise<void> {
    await this.ampqClient.sendToQueue(MOVIE_QUEUE, JSON.stringify(movie));
  }
}
