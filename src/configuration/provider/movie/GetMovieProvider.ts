import { Provider } from "@nestjs/common";
import { GetMovieGateway } from "src/application/gateway/movie/GetMovieGateway";
import { GetMovieUseCase } from "src/application/movie/GetMovieUseCase";
import { GetMovieService } from "src/domain/movie/service/GetMovieService";
import { GetMovieGatewayImpl } from "src/gateway/movie/GetMovieGatewayImpl";
import { MovieRepository } from "src/gateway/movie/repository/abstract/MovieRepository";

export const GetMovieProvider: Provider[] = [
    {
        provide: 'GetMovieService',
        useFactory: (getMovieGateway: GetMovieGateway): GetMovieService => {
            return new GetMovieUseCase(getMovieGateway);
        },
        inject: ['GetMovieGateway']
    },
    {
        provide: 'GetMovieGateway',
        useFactory: (movieRepository: MovieRepository): GetMovieGateway => {
            return new GetMovieGatewayImpl(movieRepository);
        },
        inject: ['MovieRepository']
    }
]