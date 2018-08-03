import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MoviesService } from '../services/movies.service';
import { Observable, Observer } from 'rxjs';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ng-movies';

  private movieTitle: string;
  private movie?: Movie;

  private inputChangeObservable: Observable<string>;
  private inputChangeObservers: Observer<string>[];
  private inputChangeTimeout: number;

  private processing: boolean = false;
  private message: string;

  constructor(
    private moviesService: MoviesService
  ) {
    this.inputChangeObservers = [];
    this.inputChangeObservable = Observable.create((observer) => {
      this.inputChangeObservers.push(observer);
    });
  }

  ngOnInit() {
    this.inputChangeObservable.subscribe((movieTitle: string) => {
      if (movieTitle) {
        this.processing = true;
        this.moviesService.search(movieTitle)
          .then((movieData) => {
            this.processing = false;
            this.movie = movieData;
            this.message = movieData === null
              ? 'This movie has not been found'
              : null
            ;
          })
        ;
      } else {
        this.movie = null;
        this.message = null;
      }
    });
  }

  triggerChange() {
    if (this.inputChangeTimeout) {
      clearTimeout(this.inputChangeTimeout);
    }
    this.inputChangeTimeout = setTimeout(() => {
      for (let observer of this.inputChangeObservers) {
        observer.next(this.movieTitle);
      }
    }, 1000);
  }
}
