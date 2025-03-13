import { GetMovieDto } from "src/domain/movie/dto/GetMovieDto";
import { Movie } from "src/domain/movie/Movie";
import { GetMovieService } from "src/domain/movie/service/GetMovieService";
import { GetMovieGateway } from "../gateway/movie/GetMovieGateway";

export class GetMovieUseCase implements GetMovieService{

    constructor(private readonly getMovieGateway:GetMovieGateway) {}

    public async getMovieList(getMovieDto: GetMovieDto): Promise<Movie[]> {
        return await this.getMovieGateway.getMovieList(getMovieDto);
    }
    

}