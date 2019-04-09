import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Movie } from "../models/movie.model";
import { MovieApiActions, MoviePageActions } from "src/app/movies/actions";

const adapter = createEntityAdapter({
  selectId: (movie: Movie) => movie.id,
  sortComparer: (a: Movie, b: Movie) =>
    a.name.localeCompare(b.name, null, { numeric: true })
});

export interface State extends EntityState<Movie> {}

export const initialState: State = adapter.getInitialState();

export function reducer(
  state: State = initialState,
  action: MovieApiActions.Union | MoviePageActions.Union
): State {
  switch (action.type) {
    case MovieApiActions.loadMoviesSuccess.type: {
      return adapter.addAll(action.movies, state);
    }

    case MovieApiActions.createMovieSuccess.type: {
      return adapter.addOne(action.movie, state);
    }

    case MoviePageActions.deleteMovie.type: {
      return adapter.removeOne(action.movie.id, state);
    }

    case MovieApiActions.deleteMovieFailure.type: {
      return adapter.addOne(action.movie, state);
    }

    case MoviePageActions.updateMovie.type: {
      return adapter.updateOne(
        { id: action.movie.id, changes: action.changes },
        state
      );
    }

    case MovieApiActions.updateMovieFailure.type: {
      return adapter.upsertOne(action.movie, state);
    }

    default: {
      return state;
    }
  }
}

export const { selectEntities, selectAll } = adapter.getSelectors();
