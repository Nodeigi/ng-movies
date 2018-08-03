import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Movie } from '../models/movie.model';

@Injectable()
export class MoviesService {

  private apiKey;

  constructor(
    private http: HttpClient
  ) {
    this.apiKey = 'ca5b4925';
  }

  search(text: string): Promise<Movie | null> {
    let options = {
      headers: new HttpHeaders(),
      params: new HttpParams()
        .set('apikey', this.apiKey)
        .set('t', text)
    };

    return this.http.get<any>('http://www.omdbapi.com/', options).toPromise()
      .then((response) => {
        if (response.Error) {
          return null;
        } else {
          response.posterSrc = this.posterSrc(response.imdbID);
          return response;
        }
      })
    ;
  }

  private posterSrc(imdbMovieId): string {
    return 'http://img.omdbapi.com/?apikey=ca5b4925&i=' + imdbMovieId;
  }

}
