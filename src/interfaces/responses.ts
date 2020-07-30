export enum MoowType {
  movie = 'movie',
  series = 'series',
  game = 'game',
}
export interface MoowSearchItem {
  title: string;
  year: string;
  type: MoowType;
  posterUrl: string;
}
export interface MovieSearchResponse {
  items: MoowSearchItem[];
  totalResults: number;
  nextPage: number;
}
