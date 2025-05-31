import { Movie } from "../../../domain/movie/Movie";
import { MovieRepository } from "./abstract/MovieRepository";
import { ApiRequestHandler } from "../../infra/ApiRequestHandler";
import { MovieStatus } from "../../../domain/movie/MovieStatus";

export class MovieRepositoryImpl implements MovieRepository{
    constructor(private readonly request:ApiRequestHandler) { }

    public async getMovieList(options?:{movieStatus:MovieStatus,limit:number,page:number}): Promise<Movie[]> {
        const result = await this.request.get<Movie[]>(`v1/movie?page=${options.page}&limit=${options.limit}&movieStatus=${options.movieStatus}`); 
        return result;
    }

    public async watchMovie(externalId:string): Promise<void> {
        await this.request.patchAuthenticated<Movie[]>(`v1/movie/${externalId}`, process.env.INTEGRATION_TOKEN);
    }

}