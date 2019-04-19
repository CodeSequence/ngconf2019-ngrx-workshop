import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import * as fromMovies from "./movie.reducer";

export interface State {
  movies: fromMovies.State;
}

export const reducers: ActionReducerMap<State> = {
  movies: fromMovies.reducer
};

export const metaReducers: MetaReducer<State>[] = [];

/**
 * Selectors
 */
export const selectMovieState = (state: State) => state.movies;

export const selectMovieEntities = createSelector(
  selectMovieState,
  fromMovies.selectEntities
);

export const selectMovies = createSelector(
  selectMovieState,
  fromMovies.selectAll
);

export const selectActiveMovieId = createSelector(
  selectMovieState,
  fromMovies.selectActiveMovieId
);

export const selectCurrentMovie = createSelector(
  selectMovieEntities,
  selectActiveMovieId,
  (movies, activeMovieId) => activeMovieId && movies[activeMovieId]
);

export const selectMoviesEarningsTotal = createSelector(
  selectMovies,
  movies => movies.reduce((total, movie) => total + parseInt(`${movie.earnings}`, 10) || 0, 0)
);
