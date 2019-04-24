import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Book } from "src/app/shared/models/book.model";

const initialBooks: Book[] = [
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

const createBook = (books: Book[], book: Book) => [...books, book];
const updateBook = (books: Book[], book: Book) =>
  books.map(w => {
    return w.id === book.id ? Object.assign({}, book) : w;
  });
const deleteBook = (books: Book[], book: Book) =>
  books.filter(w => book.id !== w.id);

export interface State {
  activeBookId: string | null;
  books: Book[];
}

export const initialState = {
  activeBookId: null,
  books: initialBooks
};

export function reducer(state = initialState, action: any): State {
  switch (action.type) {
    case "select":
      return {
        activeBookId: action.bookId,
        books: state.books
      };
    case "clear select":
      return {
        activeBookId: null,
        books: state.books
      };
    case "create":
      return {
        activeBookId: state.activeBookId,
        books: createBook(state.books, action.book)
      };
    case "update":
      return {
        activeBookId: state.activeBookId,
        books: updateBook(state.books, action.book)
      };
    case "delete":
      return {
        activeBookId: null,
        books: deleteBook(state.books, action.book)
      };
    default:
      return state;
  }
}
