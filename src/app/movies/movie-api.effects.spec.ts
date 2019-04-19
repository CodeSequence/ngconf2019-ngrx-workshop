import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { hot, cold } from "jasmine-marbles";
import { MoviesService } from "../shared/services/movies.service";
import { Movie } from "../shared/models/movie.model";
import { MoviesPageActions, MovieApiActions } from "./actions";
import { MovieApiEffects } from "./movie-api.effects";

describe("Movie API Effects", () => {
  let effects: MovieApiEffects;
  let actions$: Observable<Action>;
  let mockMovieService: {
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };

  const mockMovie: Movie = {
    id: "test",
    name: "Mock Movie",
    earnings: 25,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieApiEffects,
        provideMockActions(() => actions$),
        {
          provide: MoviesService,
          useFactory() {
            mockMovieService = {
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn()
            };

            return mockMovieService;
          }
        }
      ]
    });

    effects = TestBed.get(MovieApiEffects);
  });

  it("should use the API to create a movie", () => {
    const inputAction = MoviesPageActions.createMovie({
      movie: {
        name: mockMovie.name,
        earnings: 25,
      }
    });
    const outputAction = MovieApiActions.createMovieSuccess({
      movie: mockMovie
    });

    actions$ = hot("--a---", { a: inputAction });
    const response$ = cold("--b|", { b: mockMovie });
    const expected$ = cold("----c--", { c: outputAction });
    mockMovieService.create.mockReturnValue(response$);

    expect(effects.createMovie$).toBeObservable(expected$);
  });
});
