import { createAction, props } from "@ngrx/store";
import { MovieRequiredProps, Movie } from "src/app/shared/models/movie.model";

export const enter = createAction("[Movie Page] Enter");

export const selectMovie = createAction(
  "[Movie Page] Select Movie",
  props<{ movieId: string }>()
);

export const createMovie = createAction(
  "[Movie Page] Create Movie",
  props<{ movie: MovieRequiredProps }>()
);

export const updateMovie = createAction(
  "[Movie Page] Update Movie",
  props<{ movie: Movie; changes: MovieRequiredProps }>()
);

export const deleteMovie = createAction(
  "[Movie Page] Delete Movie",
  props<{ movie: Movie }>()
);

export type Union = ReturnType<
  | typeof enter
  | typeof selectMovie
  | typeof createMovie
  | typeof updateMovie
  | typeof deleteMovie
>;
