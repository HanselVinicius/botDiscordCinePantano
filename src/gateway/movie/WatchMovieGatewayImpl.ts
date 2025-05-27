import { WatchMovieGateway } from "../../application/gateway/movie/WatchMovieGateway";
import { MovieRepository } from "./repository/abstract/MovieRepository";

export class WatchMovieGatewayImpl implements WatchMovieGateway {
    constructor(private readonly movieRepository: MovieRepository) {}

    public async watchMovie(externalId: string): Promise<void> {
        await this.movieRepository.watchMovie(externalId);
    }
}