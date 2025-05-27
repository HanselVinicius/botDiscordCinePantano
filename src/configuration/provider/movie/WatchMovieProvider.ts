import { Provider } from "@nestjs/common";
import { WatchMovieGateway } from "../../../application/gateway/movie/WatchMovieGateway";
import { WatchMovieService } from "../../../domain/movie/service/WatchMovieService";
import { WatchMovieUseCase } from "../../../application/movie/WatchMovieUseCase";
import { WatchMovieGatewayImpl } from "../../../gateway/movie/WatchMovieGatewayImpl";
import { MovieRepository } from "../../../gateway/movie/repository/abstract/MovieRepository";


export const WatchMovieProvider: Provider[] = [
    {
        provide: 'WatchMovieService',
        useFactory: (watchMovieGateway:WatchMovieGateway): WatchMovieService => {
            return new WatchMovieUseCase(watchMovieGateway);
        },
        inject: ['WatchMovieGateway']
    },
    {
        provide: 'WatchMovieGateway',
        useFactory: (movieRepository:MovieRepository): WatchMovieGateway => {
            return new WatchMovieGatewayImpl(movieRepository);
        },
        inject: ['MovieRepository']

    }
]