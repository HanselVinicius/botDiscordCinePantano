import { MovieStatus } from "../MovieStatus";

export class GetMovieDto{
    constructor(
        readonly movieStatus:MovieStatus,
        readonly limit:number,
        readonly page:number
    ){}
}