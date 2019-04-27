import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import {
  mergeMap,
  map,
  catchError,
  concatMap,
  exhaustMap
} from "rxjs/operators";
import { MovieApiActions, MoviesPageActions } from "./actions";
import { MoviesService } from "../shared/services/movies.service";

@Injectable()
export class MovieApiEffects {
  constructor(
    private actions$: Actions<MoviesPageActions.Union>,
    private movieService: MoviesService
  ) {}

  @Effect() enterMoviesPage$ = this.actions$.pipe(
    ofType(MoviesPageActions.enter.type),
    exhaustMap(() =>
      this.movieService.all().pipe(
        map(movies => MovieApiActions.loadMoviesSuccess({ movies })),
        catchError(() => of(MovieApiActions.loadMoviesFailure()))
      )
    )
  );

  @Effect() createMovie$ = this.actions$.pipe(
    ofType(MoviesPageActions.createMovie.type),
    mergeMap(action =>
      this.movieService.create(action.movie).pipe(
        map(movie => MovieApiActions.createMovieSuccess({ movie })),
        catchError(() => of(MovieApiActions.createMovieFailure()))
      )
    )
  );

  @Effect() updateMovie$ = this.actions$.pipe(
    ofType(MoviesPageActions.updateMovie.type),
    concatMap(action =>
      this.movieService.update(action.movie.id, action.changes).pipe(
        map(movie => MovieApiActions.updateMovieSuccess({ movie })),
        catchError(() =>
          of(MovieApiActions.updateMovieFailure({ movie: action.movie }))
        )
      )
    )
  );

  @Effect() deleteMovie$ = this.actions$.pipe(
    ofType(MoviesPageActions.deleteMovie.type),
    mergeMap(action =>
      this.movieService.delete(action.movie.id).pipe(
        map(() =>
          MovieApiActions.deleteMovieSuccess({ movieId: action.movie.id })
        ),
        catchError(() =>
          of(MovieApiActions.deleteMovieFailure({ movie: action.movie }))
        )
      )
    )
  );
}
