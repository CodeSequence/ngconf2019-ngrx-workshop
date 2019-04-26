import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { Observable } from "rxjs";
import { hot, cold } from "jasmine-marbles";
import { BooksService } from "../shared/services/book.service";
import { Book } from "../shared/models/book.model";
import { BooksPageActions, BooksApiActions } from "./actions";
import { BooksApiEffects } from "./books-api.effects";

describe("Book API Effects", () => {
  let effects: BooksApiEffects;
  let actions$: Observable<Action>;
  let mockBookService: {
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };

  const mockBook: Book = {
    id: "test",
    name: "Mock Book",
    earnings: 25
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BooksApiEffects,
        provideMockActions(() => actions$),
        {
          provide: BooksService,
          useFactory() {
            mockBookService = {
              create: jest.fn(),
              update: jest.fn(),
              delete: jest.fn()
            };

            return mockBookService;
          }
        }
      ]
    });

    effects = TestBed.get(BooksApiEffects);
  });

  it("should use the API to create a book", () => {
    const inputAction = BooksPageActions.createBook({
      book: {
        name: mockBook.name,
        earnings: 25
      }
    });
    const outputAction = BooksApiActions.bookCreated({
      book: mockBook
    });

    actions$ = hot("--a---", { a: inputAction });
    const response$ = cold("--b|", { b: mockBook });
    const expected$ = cold("----c--", { c: outputAction });
    mockBookService.create.mockReturnValue(response$);

    expect(effects.createBook$).toBeObservable(expected$);
  });
});
