import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Movie } from "../models/movie.model";
import { MovieApiActions, MoviesPageActions } from "src/app/movies/actions";

const adapter = createEntityAdapter({
  selectId: (movie: Movie) => movie.id,
  sortComparer: (a: Movie, b: Movie) =>
    a.name.localeCompare(b.name)
});

export interface State extends EntityState<Movie> {
  activeMovieId: string | null;
}

export const initialState: State = adapter.getInitialState({
  activeMovieId: null
});

export function reducer(
  state: State = initialState,
  action: MovieApiActions.Union | MoviesPageActions.Union
): State {
  switch (action.type) {
    case MoviesPageActions.enter.type: {
      return {...state, activeMovieId: null};
    }

    case MoviesPageActions.selectMovie.type: {
      return {...state, activeMovieId: action.movieId};
    }

    case MoviesPageActions.clearSelectedMovie.type: {
      return {...state, activeMovieId: null};
    }    

    case MovieApiActions.loadMoviesSuccess.type: {
      return adapter.addAll(action.movies, state);
    }
    
    case MovieApiActions.createMovieSuccess.type: {
      return adapter.addOne(action.movie, {...state, activeMovieId: action.movie.id});
    }
    
    case MovieApiActions.updateMovieSuccess.type: {
      return adapter.updateOne({id: action.movie.id, changes: action.movie}, {...state, activeMovieId: action.movie.id});
    }

    case MovieApiActions.deleteMovieSuccess.type: {
      return adapter.removeOne(action.movieId, {...state, activeMovieId: null});
    }

    default: {
      return state;
    }
  }
}

export const { selectEntities, selectAll } = adapter.getSelectors();
export const selectActiveMovieId = (state: State) => state.activeMovieId;