export class GetMovieDto{
    constructor(
        readonly isSeen:Boolean,
        readonly limit:number,
        readonly page:number
    ){}
}