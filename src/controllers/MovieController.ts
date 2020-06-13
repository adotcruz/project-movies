import express from 'express';

import { OMDBMovies } from '@interfaces/main';
import { MovieSearchRequest } from '@interfaces/requests';
import {
  Moow,
  MoowType,
  MovieSearchResponse
} from '@interfaces/responses';
import { MovieHTTP } from '@util/Http';

import { Controller } from './Controller';

export class MovieController extends Controller {

  private apiKey: string;
  private apiPath: string;

  constructor() {
    super('/movies');
    this.initializeRoutes();
    this.apiKey = process.env.OMDB_API_KEY as string;
    this.apiPath = process.env.OMDB_PATH as string;
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/search`, this.searchForMoviesPost);
  }

  private searchForMoviesPost = async (req: express.Request, res: express.Response) => {
    const movieSearchRequest = req.body as MovieSearchRequest;

    const optionalParams = movieSearchRequest.page ? `&page=${movieSearchRequest.page}` : '';

    const searchForMoviesUrl = `${this.apiPath}/?s=${encodeURIComponent(movieSearchRequest.searchTerm)}` +
      `&apikey=${this.apiKey}${optionalParams}`;
    const response = await MovieHTTP.GET<OMDBMovieSearchResponse>(searchForMoviesUrl);
    if (response) {
      const items: Moow[] = response.Search.map((responseItem: OMDBMovies) => ({
        title: responseItem.Title,
        year: responseItem.Year,
        type: (responseItem.Type as unknown) as MoowType,
        posterUrl: responseItem.Poster
      }));
      const ourResponse: MovieSearchResponse = {
        items,
        nextPage: movieSearchRequest.page ? movieSearchRequest.page + 1 : 2,
        totalResults: response.totalResults
      }
      MovieHTTP.SEND_OK(res, ourResponse);

    } else {
      MovieHTTP.SEND_OK(res, response);

    }

  }

}

export interface OMDBMovieSearchResponse {
  Search: OMDBMovies[],
  totalResults: number,
  Response: boolean
}
