import { SlashCommandPipe } from "@discord-nestjs/common";
import { EventParams, Handler, IA, SubCommand } from "@discord-nestjs/core";
import { GetMovieDto } from "./dto/GetMovieDto";
import { Inject } from "@nestjs/common";
import { ClientEvents } from "discord.js";
import { GetMovieService } from "../../domain/movie/service/GetMovieService";
import { MovieMapper } from "../../shared/movie/MovieMapper";

@SubCommand({
    name: 'read',
    description: 'Get a movie from the List',
})
export class GetMovieSubCommand {

    constructor(
        @Inject('GetMovieService')
        private readonly getMovieService:GetMovieService
    ){}

    @Handler()
    public async execute(
        @IA(SlashCommandPipe) options:GetMovieDto,
        @EventParams() args: ClientEvents['interactionCreate'],
        
    ): Promise<String> {

        const movies = await this.getMovieService.getMovieList(MovieMapper.toDomainGetMovieDto(options.is_seen,options.limit,options.page));
        const channel = args[0].channel;
        if (!movies || movies.length === 0)
            return "Nenhum filme encontrado";
        movies.forEach((movie) => {
            channel.send(`Title: ${movie.title} - Poster: ${movie.image} - Status: ${movie.movieStatus} - ExternalId: ${movie.externalId}`);
        });
        return "Listado todos os filmes...";
    }
}
