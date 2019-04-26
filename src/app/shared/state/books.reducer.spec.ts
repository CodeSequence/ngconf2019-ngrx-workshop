import { BooksApiActions, BooksPageActions } from "src/app/books/actions";
import { Book } from "../models/book.model";
import {
  reducer,
  initialState,
  selectActiveBook,
  adapter,
  selectAll
} from "./books.reducer";

describe("Books Reducer", () => {
  it("should return the initial state when initialized", () => {
    const state = reducer(undefined, { type: "@@init" } as any);

    expect(state).toBe(initialState);
  });

  it("should load all books when the API loads them all successfully", () => {
    const books: Book[] = [{ id: "1", name: "Castaway", earnings: 1000000 }];
    const action = BooksApiActions.booksLoaded({ books });

    const state = reducer(initialState, action);

    expect(state).toMatchSnapshot();
  });

  it("should add a newly created book to the state", () => {
    const book: Book = { id: "1", name: "Forrest Gump", earnings: 200000000 };
    const action = BooksApiActions.bookCreated({ book });

    const state = reducer(initialState, action);

    expect(state).toMatchSnapshot();
  });

  it("should remove books from the state when they are deleted", () => {
    const book: Book = { id: "1", name: "Apollo 13", earnings: 1000 };
    const firstAction = BooksApiActions.bookCreated({ book });
    const secondAction = BooksApiActions.bookDeleted({ book });

    const state = [firstAction, secondAction].reduce(reducer, initialState);

    expect(state).toMatchSnapshot();
  });

  describe("Selectors", () => {
    const initialState = { activeBookId: null, ids: [], entities: {} };

    describe("selectActiveBook", () => {
      it("should return null if there is no active book", () => {
        const result = selectActiveBook(initialState);

        expect(result).toBe(null);
      });

      it("should return the active book if there is one", () => {
        const book: Book = { id: "1", name: "Castaway", earnings: 1000000 };
        const state = adapter.addAll([book], {
          ...initialState,
          activeBookId: "1"
        });
        const result = selectActiveBook(state);

        expect(result).toBe(book);
      });
    });

    describe("selectAll", () => {
      it("should return all the loaded books", () => {
        const books: Book[] = [
          { id: "1", name: "Castaway", earnings: 1000000 }
        ];
        const state = adapter.addAll(books, initialState);
        const result = selectAll(state);

        expect(result.length).toBe(1);
      });
    });
  });
});
