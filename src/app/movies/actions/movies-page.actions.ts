import { createAction, props } from "@ngrx/store";
import { MovieRequiredProps, Movie } from "src/app/shared/models/movie.model";

export const enter = createAction("[Movies Page] Enter");

export const selectMovie = createAction(
  "[Movies Page] Select Movie",
  props<{ movieId: string }>()
);

export const clearSelectedMovie = createAction(
  "[Movies Page] Clear Selected Movie"
);

export const createMovie = createAction(
  "[Movies Page] Create Movie",
  props<{ movie: MovieRequiredProps }>()
);

export const updateMovie = createAction(
  "[Movies Page] Update Movie",
  props<{ movie: Movie; changes: MovieRequiredProps }>()
);

export const deleteMovie = createAction(
  "[Movies Page] Delete Movie",
  props<{ movie: Movie }>()
);

export type Union = ReturnType<
  | typeof enter
  | typeof selectMovie
  | typeof clearSelectedMovie
  | typeof createMovie
  | typeof updateMovie
  | typeof deleteMovie
>;
