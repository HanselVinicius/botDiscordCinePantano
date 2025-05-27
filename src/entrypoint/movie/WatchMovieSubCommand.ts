import { SlashCommandPipe } from "@discord-nestjs/common";
import { Handler, IA, SubCommand } from "@discord-nestjs/core";
import { Inject } from "@nestjs/common";
import { WatchMovieService } from "src/domain/movie/service/WatchMovieService";

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
        @IA(SlashCommandPipe) externalId: string,
    ): Promise<String> {
        try {
            await this.watchMovieService.watchMovie(externalId);
            return "Filme assistido com sucesso!";
        } catch (error) {
            console.error("Error watching movie:", error);
            return "Filme Já Assistido.";
        }

    }


}