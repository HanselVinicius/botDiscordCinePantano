import { WatchMovieService } from "../../domain/movie/service/WatchMovieService";
import { WatchMovieGateway } from "../gateway/movie/WatchMovieGateway";

export class WatchMovieUseCase implements WatchMovieService{

    constructor(private readonly watchMovieGateway: WatchMovieGateway) { }
    
    public async watchMovie(externalId: string): Promise<void> {
        await this.watchMovieGateway.watchMovie(externalId)
    }

}