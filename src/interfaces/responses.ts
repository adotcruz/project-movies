export enum MoowType {
  movie = "movie"
}
export interface Moow {
  title: string;
  year: string;
  type: MoowType;
  posterUrl: string;
}
export interface MovieSearchResponse {
  items: Moow[];
  totalResults: number;
  nextPage: number;
}