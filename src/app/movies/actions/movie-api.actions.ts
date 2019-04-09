import { createAction, props } from "@ngrx/store";
import { Movie } from "src/app/shared/models/movie.model";

export const loadMoviesSuccess = createAction(
  "[Movie API] Load Movies Success",
  props<{ movies: Movie[] }>()
);

export const loadMoviesFailure = createAction(
  "[Movie API] Load Movies Failure"
);

export const createMovieSuccess = createAction(
  "[Movie API] Create Movie Success",
  props<{ movie: Movie }>()
);

export const createMovieFailure = createAction(
  "[Movie API] Create Movie Failure"
);

export const updateMovieSuccess = createAction(
  "[Movie API] Update Movie Success",
  props<{ movie: Movie }>()
);

export const updateMovieFailure = createAction(
  "[Movie API] Update Movie Failure",
  props<{ movie: Movie }>()
);

export const deleteMovieSuccess = createAction(
  "[Movie API] Delete Movie Success",
  props<{ movieId: string }>()
);

export const deleteMovieFailure = createAction(
  "[Movie API] Delete Movie Failure",
  props<{ movie: Movie }>()
);

export type Union = ReturnType<
  | typeof loadMoviesSuccess
  | typeof loadMoviesFailure
  | typeof createMovieSuccess
  | typeof createMovieFailure
  | typeof updateMovieSuccess
  | typeof updateMovieFailure
  | typeof deleteMovieSuccess
  | typeof deleteMovieFailure
>;
