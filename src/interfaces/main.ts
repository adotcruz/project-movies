export interface OMDBMovies {
  Title: string,
  Year: string,
  imdbID: string,
  Type: OMDBTypes,
  Poster: string
}

export enum OMDBTypes {
  movies
}