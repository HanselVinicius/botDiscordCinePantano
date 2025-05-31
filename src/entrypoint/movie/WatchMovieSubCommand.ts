import { SlashCommandPipe } from "@discord-nestjs/common";
import { Handler, IA, SubCommand } from "@discord-nestjs/core";
import { Inject } from "@nestjs/common";
import { WatchMovieService } from "../../domain/movie/service/WatchMovieService";
import { WatchMovieDto } from "./dto/WatchMovieDto";

@SubCommand({
    name: 'watch',
    description: 'Watch a movie from the List',
})
export class WatchMovieSubCommand {

    constructor(
        @Inject('WatchMovieService')
        private readonly watchMovieService: WatchMovieService
    ) { }

    @Handler()
    public async execute(
        @IA(SlashCommandPipe)  watchMovieDto: WatchMovieDto,
    ): Promise<String> {
        try {
            await this.watchMovieService.watchMovie(watchMovieDto.externalId);
            return "Filme assistido com sucesso!";
        } catch (error) {
            console.error("Error watching movie:", error);
            return "Filme Já Assistido.";
        }

    }


}