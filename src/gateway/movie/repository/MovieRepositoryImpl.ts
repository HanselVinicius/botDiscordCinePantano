import { Movie } from "src/domain/movie/Movie";
import { MovieRepository } from "./abstract/MovieRepository";
import { ApiRequestHandler } from "src/gateway/infra/ApiRequestHandler";

export class MovieRepositoryImpl implements MovieRepository{
    constructor(private readonly request:ApiRequestHandler) { }

    public async getMovieList(options?:{isSeen:Boolean,limit:number,page:number}): Promise<Movie[]> {
        const result = await this.request.get<Movie[]>(`v1/movie?page=${options.page}&limit=${options.limit}`); 
        return result;
    }
}