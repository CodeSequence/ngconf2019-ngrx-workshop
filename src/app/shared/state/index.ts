import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";
import * as fromMovies from "./movie.reducer";

export interface State {
  movies: fromMovies.State;
}

export const reducers: ActionReducerMap<State> = {
  movies: fromMovies.reducer
};

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

export const metaReducers: MetaReducer<State>[] = [];
