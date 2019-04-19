import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { MoviesPageActions } from '../../actions';
import { Movie } from 'src/app/shared/models/movie.model';
import * as fromRoot from 'src/app/shared/state';

@Component({
  selector: 'app-movies',
  templateUrl: './movies-page.component.html',
  styleUrls: ['./movies-page.component.css']
})
export class MoviesPageComponent implements OnInit {
  movies$ = this.store.pipe(select(fromRoot.selectMovies));
  currentMovie$ = this.store.pipe(select(fromRoot.selectCurrentMovie));
  total$ = this.store.pipe(select(fromRoot.selectMoviesEarningsTotal));

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(MoviesPageActions.enter());
  }

  onSelect(movie: Movie) {
    this.store.dispatch(MoviesPageActions.selectMovie({movieId: movie.id}));
  }

  onCancel() {
    this.store.dispatch(MoviesPageActions.clearSelectedMovie());
  }

  onSave(movie: Movie) {
    if (!movie.id) {
      this.saveMovie(movie);
    } else {
      this.updateMovie(movie);
    }
  }

  saveMovie(movie: Movie) {
    this.store.dispatch(MoviesPageActions.createMovie({movie}));
  }

  updateMovie(movie: Movie) {
    this.store.dispatch(MoviesPageActions.updateMovie({movie, changes: movie}));
  }

  onDelete(movie: Movie) {
    this.store.dispatch(MoviesPageActions.deleteMovie({movie}));
  }
}
