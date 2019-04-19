import { MovieApiActions, MoviesPageActions } from "src/app/movies/actions";
import { Movie } from "../models/movie.model";
import { reducer, initialState } from "./movie.reducer";

describe("Movie Reducer", () => {
  it("should return the initial state when initialized", () => {
    const state = reducer(undefined, { type: "@@init" } as any);

    expect(state).toBe(initialState);
  });

  it("should load all movies when the API loads them all successfully", () => {
    const movies: Movie[] = [{ id: "1", name: "Green Lantern", earnings: 0 }];
    const action = MovieApiActions.loadMoviesSuccess({ movies });

    const state = reducer(initialState, action);

    expect(state).toMatchSnapshot();
  });

  it("should add newly created movies to the state", () => {
    const movie: Movie = { id: "1", name: "Arrival", earnings: 100000 };
    const action = MovieApiActions.createMovieSuccess({ movie });

    const state = reducer(initialState, action);

    expect(state).toMatchSnapshot();
  });

  it("should remove movies from the state when they are deleted", () => {
    const movie: Movie = { id: "1", name: "mother!", earnings: 1000 };
    const firstAction = MovieApiActions.createMovieSuccess({ movie });
    const secondAction = MoviesPageActions.deleteMovie({ movie });

    const state = [firstAction, secondAction].reduce(reducer, initialState);

    expect(state).toMatchSnapshot();
  });

  it("should roll back a deletion if deleting a movie fails", () => {
    const movie: Movie = { id: "1", name: "Black Panther", earnings: 10000 };
    const firstAction = MovieApiActions.createMovieSuccess({ movie });
    const secondAction = MoviesPageActions.deleteMovie({ movie });
    const thirdAction = MovieApiActions.deleteMovieFailure({ movie });

    const state = [firstAction, secondAction, thirdAction].reduce(
      reducer,
      initialState
    );

    expect(state).toMatchSnapshot();
  });

  it("should apply changes to a movie when a movie is updated", () => {
    const movie: Movie = { id: "1", name: "Blade Runner", earnings: 120000 };
    const changes = { name: "Blade Runner (Final Cut)", earnings: 150000 };
    const firstAction = MovieApiActions.createMovieSuccess({ movie });
    const secondAction = MoviesPageActions.updateMovie({ movie, changes });

    const state = [firstAction, secondAction].reduce(reducer, initialState);

    expect(state).toMatchSnapshot();
  });

  it("should rollback changes to a movie if there is an error when updating it with the API", () => {
    const movie: Movie = {
      id: "1",
      name: "Star Wars: A New Hope",
      earnings: 10000000000
    };
    const changes = {
      name: "Star Wars: A New Hope (Special Edition)",
      earnings: 12000000000
    };
    const firstAction = MovieApiActions.createMovieSuccess({ movie });
    const secondAction = MoviesPageActions.updateMovie({ movie, changes });
    const thirdAction = MovieApiActions.updateMovieFailure({ movie });

    const state = [firstAction, secondAction, thirdAction].reduce(
      reducer,
      initialState
    );

    expect(state).toMatchSnapshot();
  });
});
