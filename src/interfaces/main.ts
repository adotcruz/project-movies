export interface OMDBMovies {
  Title: string;
  Year: string;
  imdbID: string;
  Type: OMDBTypes;
  Poster: string;
  Rated?: string;
  Genre?: string;
  Ratings?: OMDBMoviesRatings;
  Writer?: string;
  Actors?: string;
  Director?: string;
}

export enum OMDBTypes {
  movies,
  series,
  game,
}

export interface OMDBMoviesRatings {
  Source: string;
  Value: string;
}
