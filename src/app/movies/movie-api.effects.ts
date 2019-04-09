import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { mergeMap, map, catchError, concatMap } from "rxjs/operators";
import { MovieApiActions, MoviePageActions } from "./actions";
import { MovieService } from "../shared/services/movie.service";

@Injectable()
export class MovieApiEffects {
  constructor(
    private actions$: Actions<MoviePageActions.Union>,
    private movieService: MovieService
  ) {}

  @Effect() createMovie$ = this.actions$.pipe(
    ofType(MoviePageActions.createMovie.type),
    mergeMap(action =>
      this.movieService.create(action.movie).pipe(
        map(movie => MovieApiActions.createMovieSuccess({ movie })),
        catchError(() => of(MovieApiActions.createMovieFailure()))
      )
    )
  );

  @Effect() updateMovie$ = this.actions$.pipe(
    ofType(MoviePageActions.updateMovie.type),
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
    ofType(MoviePageActions.deleteMovie.type),
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
