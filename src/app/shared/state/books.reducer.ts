import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Book } from "src/app/shared/models/book.model";
import { BooksPageActions } from "src/app/books/actions";

export const initialBooks: Book[] = [
  {
    id: "1",
    name: "Fellowship of the Ring",
    earnings: 100000000,
    description: "The start"
  },
  {
    id: "2",
    name: "The Two Towers",
    earnings: 200000000,
    description: "The middle"
  },
  {
    id: "3",
    name: "The Return of The King",
    earnings: 400000000,
    description: "The end"
  }
];

export interface State extends EntityState<Book> {
  activeBookId: string | null;
}

export const adapter = createEntityAdapter<Book>();

export const initialState = adapter.getInitialState({
  activeBookId: null
});

export function reducer(
  state = initialState,
  action: BooksPageActions.BooksActions
): State {
  switch (action.type) {
    case BooksPageActions.BooksActionTypes.Enter:
      return adapter.addAll(initialBooks, state);

    case BooksPageActions.BooksActionTypes.SelectBook:
      return {
        ...state,
        activeBookId: action.bookId
      };

    case BooksPageActions.BooksActionTypes.ClearSelectedBook:
      return {
        ...state,
        activeBookId: null
      };

    case BooksPageActions.BooksActionTypes.CreateBook:
      return adapter.addOne(action.book, state);

    case BooksPageActions.BooksActionTypes.UpdateBook:
      return adapter.updateOne(
        { id: action.book.id, changes: action.book },
        { ...state, activeBookId: action.book.id }
      );

    case BooksPageActions.BooksActionTypes.DeleteBook:
      return adapter.removeOne(action.book.id, {
        ...state,
        activeBookId: null
      });

    default:
      return state;
  }
}
