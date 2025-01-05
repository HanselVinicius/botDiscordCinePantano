import { AddMovieDto } from "../dto/AddMovieDto";
import { MovieFactory } from "./MovieFactory";

describe('MovieFactory', ()=>{
  it('should sucessfully create a movie', ()=>{
    let addMovieDto:AddMovieDto = {
      title: 'The Godfather',
      launch_date: '24/03/1972',
      duration: 175
    } as AddMovieDto;
    let movie = MovieFactory.createMovie(addMovieDto);
    expect(movie.title).toBe('The Godfather');
    expect(movie.launchDate).toEqual(new Date('1972-03-24'));
    expect(movie.duration).toBe(175);
  });

  it('should throw an error when the date format is invalid', ()=>{
    let addMovieDto:AddMovieDto = {
      title: 'The Godfather',
      launch_date: '24-03-1972',
      duration: 175
    } as AddMovieDto;
    expect(()=>MovieFactory.createMovie(addMovieDto)).toThrow('Invalid date format. Expected dd/mm/yyyy');
  });

});