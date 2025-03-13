import { Provider } from "@nestjs/common";
import { ApiRequestHandler } from "src/gateway/infra/ApiRequestHandler";
import createApiInstance from "src/gateway/infra/AxiosInstance";
import { MovieRepository } from "src/gateway/movie/repository/abstract/MovieRepository";
import { MovieRepositoryImpl } from "src/gateway/movie/repository/MovieRepositoryImpl";

export const MovieRepositoryProvider: Provider[] = [
    {
        provide: 'MovieRepository',
        useFactory: (apiRequestHandler: ApiRequestHandler): MovieRepository => {
            return new MovieRepositoryImpl(apiRequestHandler);
        },
        inject: ['ApiRequestHandler']
    },
    {
        provide: 'ApiRequestHandler',
        useFactory: (): ApiRequestHandler => {
            return new ApiRequestHandler(createApiInstance());
        }
    }
]