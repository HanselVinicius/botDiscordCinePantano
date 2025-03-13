import { GetMovieGateway } from "src/application/gateway/movie/GetMovieGateway";
import { GetMovieDto } from "src/domain/movie/dto/GetMovieDto";
import { Movie } from "src/domain/movie/Movie";
import { MovieRepository } from "./repository/abstract/MovieRepository";

export class GetMovieGatewayImpl implements GetMovieGateway {
    constructor(private readonly movieRepository:MovieRepository) { }

    public async getMovieList(getMovieDto: GetMovieDto): Promise<Movie[]> {
        return await this.movieRepository.getMovieList(getMovieDto);
    }


}