export interface WatchMovieService {
    watchMovie(externalId: string): Promise<void>;
}