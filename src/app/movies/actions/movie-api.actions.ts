import { createAction, props } from "@ngrx/store";
import { Movie } from "src/app/shared/models/movie.model";

export const loadMoviesSuccess = createAction(
  "[Movies API] Load Movies Success",
  props<{ movies: Movie[] }>()
);

export const loadMoviesFailure = createAction(
  "[Movies API] Load Movies Failure"
);

export const createMovieSuccess = createAction(
  "[Movies API] Create Movie Success",
  props<{ movie: Movie }>()
);

export const createMovieFailure = createAction(
  "[Movies API] Create Movie Failure"
);

export const updateMovieSuccess = createAction(
  "[Movies API] Update Movie Success",
  props<{ movie: Movie }>()
);

export const updateMovieFailure = createAction(
  "[Movies API] Update Movie Failure",
  props<{ movie: Movie }>()
);

export const deleteMovieSuccess = createAction(
  "[Movies API] Delete Movie Success",
  props<{ movieId: string }>()
);

export const deleteMovieFailure = createAction(
  "[Movies API] Delete Movie Failure",
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
