import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { hot, cold } from "jasmine-marbles";
import { MovieService } from "../shared/services/movie.service";
import { Movie } from "../shared/models/movie.model";
import { MoviePageActions, MovieApiActions } from "./actions";
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
    rating: 1
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieApiEffects,
        provideMockActions(() => actions$),
        {
          provide: MovieService,
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
    const inputAction = MoviePageActions.createMovie({
      movie: {
        name: mockMovie.name,
        rating: mockMovie.rating
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
