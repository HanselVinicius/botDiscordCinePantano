export interface WatchMovieGateway {
    watchMovie(externalId: string): Promise<void>;
}